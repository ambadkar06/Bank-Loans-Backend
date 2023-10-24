const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router
    .route('/')
    .post(authController.sign_in)
router
    .route('/register')
    .post(authController.register)
router
    .route('/logout')
    .get(authController.authorization, (req, res) => {
        return res
            .clearCookie("access_token")
            .status(200)
            .json({ message: "Successfully logged out" });
    });
module.exports = router;