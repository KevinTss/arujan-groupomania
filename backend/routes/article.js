const express = require('express');
const router = express.Router();

const articleCtrl = require('../controllers/article');

router.get('/', articleCtrl.getAllArticles);
router.post('/', articleCtrl.createArticle);
router.get('/:id', articleCtrl.getOneArticle);
router.put('/:id', articleCtrl.modifyArticle);
router.delete('/:id', articleCtrl.deleteArticle);

module.exports = router;