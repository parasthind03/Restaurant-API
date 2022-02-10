const router = require('express').Router();
const { ensureAuth } = require('../helpers/ensureAuth');
const { protect } = require('../controllers/authController');
const itemController = require('../controllers/itemControlller');

router.get('/getAll', itemController.getAllItems);

router.use(protect);
router.get('/get/:id', itemController.getItem);

router.use(ensureAuth);
router.post('/add', itemController.addItem);
router.post('/update/:id', itemController.updateItem);
router.post('/remove/:id', itemController.removeItem);
router.delete('/delete/:id', itemController.deleteItem);

module.exports = router;
