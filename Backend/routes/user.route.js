const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');


router.post('/register', [
    body('fullname.firstname').notEmpty().withMessage('Firstname is required').trim().isLength({ min: 2 }).withMessage('Firstname must be at least 2 characters long'),
    body('email').isEmail().withMessage('Invalid email address').normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], userController.registerUser);


router.post('/login', [
    body('email').isEmail().withMessage('Invalid email address').normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], userController.loginUser);


router.get('/profile', authMiddleware.authUser, userController.getProfile);

router.get('/logout', authMiddleware.authUser, userController.logoutUser);

module.exports = router;