const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');
const authorization = require('../controllers/authController').authorization
router
    .route('/')
    .post(authorization, loanController.newLoan)
    .get(authorization, loanController.getAllLoans)
router
    .route('/:id')
    .get(authorization, loanController.getLoan)
    .put(authorization, loanController.updateLoan)
    .delete(authorization, loanController.deleteLoan)
module.exports = router;