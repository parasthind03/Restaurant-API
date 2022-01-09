const router = require('express').Router();
const { login, register, protect } = require('../controllers/authController');
const userController = require('../controllers/userController')

router.post('/register', register);
router.post('/login', login);

//Protected Routes
router.use(protect);

//get a user
router.get('/:id', userController.getUser);
//Update user
router.patch('/:id', userController.updateUser);
//Delete user
router.delete('/', userController.deleteUser);

module.exports = router;
