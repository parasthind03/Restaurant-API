const router = require('express').Router();
const { ensureAuth } = require('../helpers/ensureAuth');
const { protect } = require('../controllers/authController');
const itemController = require('../controllers/itemControlller');
const { upload, resizePicture } = require('../middleware/multer');

router.get('/getAll', itemController.getAllItems);

router.use(protect);
router.get('/get/:id', itemController.getItem);
router.post('/rate/:id', itemController.rate);

router.use(ensureAuth);
router.post('/add', itemController.addItem);
router.post('/update/:id', itemController.updateItem);
router.post('/remove/:id', itemController.removeItem);
router.delete('/delete/:id', itemController.deleteItem);

router.patch('/upload/:id', upload.single('photoUrl'), resizePicture, itemController.updateItem);

module.exports = router;
