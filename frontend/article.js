const articleContainer = document.querySelector('#article-container');
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

newCommentForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const body = bodyInput.value;
  const id_article = Number(getArticleIdFromUrl());
  const user = JSON.parse(localStorage.getItem('user'));
  const id_user = user.id_user;
  const data = { id_article, id_user, body };

  const r = postComment(data);
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

(async function () {
  const articleId = getArticleIdFromUrl();
  const article = await getArticle(articleId);
  displayArticle(article);
})();
