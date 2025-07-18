const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const captainController = require('../controllers/captain.controller');
const captainAuthMiddleware = require('../middlewares/captainAuth.middleware');

router.post('/register', [
    body('fullname.firstname')
        .notEmpty().withMessage('Firstname is required')
        .trim()
        .isLength({ min: 2 }).withMessage('Firstname must be min 2 characters long'),
    body('email')
        .isEmail().withMessage('Invalid email'),
    body('password')
        .notEmpty().withMessage('Password is required')
        .trim()
        .isLength({ min: 6 }).withMessage('Password must be min 6 characters long'),
    body('vehicle.color')
        .notEmpty().withMessage('Color is required')
        .trim()
        .isLength({ min: 3 }).withMessage('Color must be min 3 characters long'),
    body('vehicle.plate')
        .notEmpty().withMessage('Number Plate is required')
        .trim()
        .isLength({ min: 8 }).withMessage('Number Plate must be min 8 characters long'),
    body('vehicle.capacity')
        .notEmpty().withMessage('Capacity is required')
        .isInt({ min: 1 }).withMessage('Capacity must be a number greater than 0'),
    body('vehicle.vehicleType')
        .notEmpty().withMessage('Vehicle type is required')
        .trim()
        .isLength({ min: 3 }).withMessage('Vehicle type must be min 3 characters long')
], captainController.registerCaptain);


router.post('/login', [
    body('email')
        .isEmail().withMessage('Invalid Email'),
    body('password')
        .notEmpty().withMessage('Password is required')
        .trim()
        .isLength({min:6}).withMessage('Password must be 6 characters long')
], captainController.loginCaptain);

router.get('/profile', captainAuthMiddleware.authCaptain ,captainController.getProfile)

router.get('/logout', captainAuthMiddleware.authCaptain, captainController.logout)

module.exports = router;