const articlesContainer = document.querySelector('#articles-container');

/**
 * @return {array} Articles array
 */
async function getArticles() {
  try {
    const response = await fetch('http://localhost:3000/api/article/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('token'),
      },
    });
    if (response.status !== 200) {
      return [];
    }
    const res = await response.json();
    return res.data;
  } catch (err) {
    console.err(err.message);
    return [];
  }
}

function displayArticles(articles) {
  let content = '';

  articles.forEach((article) => {
    content += `
    <a href="/Groupomania/frontend/article.html?id=${article.id_article}">
      <div class="article-card">
        <h3>${article.title}</h3>
        <img src="http://localhost:3000/images/${article.image_url}" alt="pinguin">
        <p>${article.description}</p>
        <span>${article.posted_date}</span>
      </div>
    </a>
    `;
  });

  articlesContainer.innerHTML = content;
}

(async function () {
  const articles = await getArticles();
  displayArticles(articles);
})();
