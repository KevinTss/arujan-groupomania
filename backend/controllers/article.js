const db = require('../database');

// récupérer tous les articles
exports.getAllArticles = (req, res, next) => {
  db.query('SELECT * FROM articles', async (error, results) => {
    return res.status(200).json({
      data: results,
    });
  });
};

// créer un article
exports.createArticle = (req, res, next) => {
  const { title, description, id_user } = req.body;

  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();
  const hour = String(today.getHours()).padStart(2, '0');
  const min = String(today.getMinutes()).padStart(2, '0');
  const sec = String(today.getSeconds()).padStart(2, '0');

  const date = `${yyyy}-${mm}-${dd} ${hour}:${min}:${sec}`;

  db.query(
    'INSERT INTO articles SET ?',
    { title, description, posted_date: date, id_user },
    async (error) => {
      if (error) {
        return res.status(500).json({
          messageIntern: error.message,
          messagePublic: "Un erreur s'est produite, réessayer plus tard",
        });
      }

      return res.status(200).json({
        message: 'Article correctement créé',
      });
    }
  );
};

//récupérer un article
exports.getOneArticle = (req, res, next) => {
  const articleId = req.params.id;

  return res.status(200).json({
    id: articleId,
  });
};

//modifier un article
exports.modifyArticle = (req, res, next) => {};

//supprimer un article
exports.deleteArticle = (req, res, next) => {};
