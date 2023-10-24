const express = require('express');
const router = express.Router();
const ledgerController = require('../controllers/ledgerController');
const authorization = require('../controllers/authController').authorization


router
    .route('/')
    .post(authorization, ledgerController.newLedger)
    .get(authorization, ledgerController.getAllLedgers)
router
    .route('/:id')
    .get(authorization, ledgerController.getLedger)
    .put(authorization, ledgerController.updateLedger)
    .delete(authorization, ledgerController.deleteLedger)
module.exports = router;