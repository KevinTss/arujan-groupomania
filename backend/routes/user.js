const express = require('express');
const router = express.Router();

const { requireAuth } = require('../middleware/auth');
const userCtrl = require('../controllers/user');

router.get('/me', requireAuth, userCtrl.me);
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/:id', userCtrl.modifyUser);
router.delete('/:id', userCtrl.deleteUser);

module.exports = router;
