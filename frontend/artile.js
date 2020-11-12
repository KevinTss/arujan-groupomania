const articlesContainer = document.querySelector('#articles-container');

function getArticleIdFromUrl() {
  return 'ljbljb';
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

function displayArticles(articles) {
  let content = '';

  articles.forEach((article) => {
    console.log('article titre:', article.title);
    content += `
      <div class="article-card">
        <h3>${article.title}</h3>
        <img src="https://ixxidesign.azureedge.net/media/2393400/ixxi-lila-and-lola-pinguinprint362_lilaxlola_papersize.jpg?width=498" alt="pinguin">
        <p>${article.description}</p>
        <span>${article.posted_date}</span>
      </div>
    `;
  });

  articlesContainer.innerHTML = content;
}

(async function () {
  const articleId = getArticleIdFromUrl();
  const article = await getArticle(id);
})();
