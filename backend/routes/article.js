const express = require('express');
const router = express.Router();
const articleCtrl = require('../controllers/article');
const upload = require('../middleware/upload');
const { requireAuth } = require('../middleware/auth');

router.get('/', requireAuth, articleCtrl.getAllArticles);
router.post('/', upload, articleCtrl.createArticle);
router.get('/:id', requireAuth, articleCtrl.getOneArticle);
router.put('/:id', requireAuth, articleCtrl.modifyArticle);
router.delete('/:id', requireAuth, articleCtrl.deleteArticle);

module.exports = router;
