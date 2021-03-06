const router = require('express').Router();
const cartController = require('../controllers/cartController');
const { protect } = require('../controllers/authController');
const { ensureUser } = require('../helpers/ensureAuth');

router.use(protect);
router.use(ensureUser);

router.get('/getMyCart', cartController.getCart);

router.post('/create/:itemId', cartController.createCart);
router.patch('/update/:itemId', cartController.updateCart);
router.delete('/delete/:itemId', cartController.deleteCart);

module.exports = router;
