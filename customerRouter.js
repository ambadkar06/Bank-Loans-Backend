const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const authorization = require('../controllers/authController').authorization


router
    .route('/')
    .post(authorization, customerController.newCustomer)
    .get(authorization, customerController.getAllCustomers)
router
    .route('/:id')
    .get(authorization, customerController.getCustomer)
    .put(authorization, customerController.updateCustomer)
    .delete(authorization, customerController.deleteCustomer)
module.exports = router;