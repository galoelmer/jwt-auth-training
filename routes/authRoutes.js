const { Router } = require('express');
const router = Router();
const { isUserAuthorized } = require('../middleware/authMiddleware');

const authController = require('../controllers/authController');

router.get('/signup', isUserAuthorized, authController.signup_get);
router.post('/signup', authController.signup_post);
router.get('/login', isUserAuthorized, authController.login_get);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);

module.exports = router;
