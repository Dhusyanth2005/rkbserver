const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { loginSchema, changePasswordSchema } = require('../validators/authValidator');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');

router.post('/login', validate(loginSchema), authController.login);
router.post('/change-password', auth, validate(changePasswordSchema), authController.changePassword);
router.get('/profile', auth, authController.getProfile);

module.exports = router;