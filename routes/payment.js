const router = require('express').Router();
const { ensureUser } = require('../helpers/ensureAuth');
const { protect } = require('../controllers/authController');
const { createCheckoutSession } = require('../controllers/purachaseController');

router.get('/', protect, ensureUser, createCheckoutSession);

module.exports = router;
