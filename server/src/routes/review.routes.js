const express = require('express');
const reviewController = require('../controllers/review.controller');
const { verifyJWT } = require('../middleware/auth.middleware');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

// Public routes
router.get('/', asyncHandler(reviewController.getReviews));

// Protected routes
router.post(
  '/',
  verifyJWT,
  asyncHandler(reviewController.createReview)
);

router.put(
  '/:id',
  verifyJWT,
  asyncHandler(reviewController.updateReview)
);

router.delete(
  '/:id',
  verifyJWT,
  asyncHandler(reviewController.deleteReview)
);

module.exports = router;
