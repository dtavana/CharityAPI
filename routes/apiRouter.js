const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

/* POST new donation. */
router.post('/newdonation', apiController.newDonation);

/* GET all donations for a specific email */
router.get('/getdonations', apiController.getDonations);

module.exports = router;
