const router = require('express').Router();
const { protect } = require('../controllers/authController');
const reviewController = require('../controllers/reviewController');

router.get('/getAllReviews/:id', reviewController.getAllReviews);

router.use(protect);

router.post('/createReview', reviewController.createReview);
router.patch('/updateReview/:id', reviewController.updateReview);
router.delete('/deleteReview/:id', reviewController.deleteReview);

module.exports = router;
