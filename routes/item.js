const router = require('express').Router();
const { ensureAuth } = require('../helpers/ensureAuth');
const { protect } = require('../controllers/authController');
const itemController = require('../controllers/itemControlller');

router.get('/getAllItems', itemController.getAllItems);

router.use(protect);
router.get('/getItem/:id', itemController.getItem);

router.use(ensureAuth);
router.post('/addItem', itemController.addItem);

module.exports = router;
