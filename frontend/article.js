const articleContainer = document.querySelector('#article-container');
const commentsContainer = document.querySelector('#comments');
const newCommentForm = document.querySelector('#new-comment-form');
const bodyInput = document.querySelector('#body-input');

async function postComment(data) {
  try {
    const response = await fetch(`http://localhost:3000/api/commentaire`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.status !== 200) {
      return null;
    }
    const res = await response.json();
    return res.data;
  } catch (err) {
    console.err(err.message);
    return [];
  }
}

newCommentForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const body = bodyInput.value;
  const id_article = Number(getArticleIdFromUrl());
  const user = JSON.parse(localStorage.getItem('user'));
  const id_user = user.id_user;
  const data = { id_article, id_user, body };

  await postComment(data);
  location.reload();
});

function getArticleIdFromUrl() {
  // ?id=2 ==> 2
  const id = window.location.search.replace('?id=', '');
  return id;
}

/**
 * @return {object} Article
 */
async function getArticle(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/article/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('token'),
      },
    });
    if (response.status !== 200) {
      return null;
    }
    const res = await response.json();
    return res.data;
  } catch (err) {
    console.err(err.message);
    return [];
  }
}

async function getArticleComments(id) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/article/${id}/comments`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('token'),
        },
      }
    );
    if (response.status !== 200) {
      return null;
    }
    const res = await response.json();
    return res.data;
  } catch (err) {
    console.err(err.message);
    return [];
  }
}

async function getUsers(ids) {
  const urlIds = ids.join('-');

  try {
    const response = await fetch(
      `http://localhost:3000/api/auth/users/${urlIds}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('token'),
        },
      }
    );
    if (response.status !== 200) {
      return null;
    }
    const res = await response.json();
    return res.users;
  } catch (err) {
    console.err(err.message);
    return [];
  }
}

function displayArticle(article) {
  const content = `
      <div class="article-card">
        <h3>${article.title}</h3>
        <img src="http://localhost:3000/images/${article.image_url}" alt="pinguin">
        <p>${article.description}</p>
        <span>${article.posted_date}</span>
      </div>
    `;

  articleContainer.innerHTML = content;
}

function getUsername(users, userId) {
  return users.find((user) => user.id_user === userId);
}

function displayComments(comments, users) {
  let content = '';

  comments.forEach((comment) => {
    content += `
      <div class="comment-card">
        <p>${getUsername(users, comment.id_user).username}</p>
        <p>${comment.body}</p>
        <span>${comment.post_date}</span>
      </div>
    `;
  });

  commentsContainer.innerHTML = content;
}

(async function () {
  const articleId = getArticleIdFromUrl();
  const article = await getArticle(articleId);
  const comments = await getArticleComments(articleId);
  const ids = comments.map((comment) => comment.id_user);
  const users = await getUsers(ids);
  displayArticle(article);
  displayComments(comments, users);
})();
