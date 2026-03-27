const express = require('express');
const userController = require('../controllers/user.controller');
const { verifyJWT } = require('../middleware/auth.middleware');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

// Public routes
router.get('/browse/developers', asyncHandler(userController.getAllDevelopers));
router.get('/:id', asyncHandler(userController.getUserProfile));
router.get('/:id/reviews', asyncHandler(userController.getUserReviews));
router.get('/:id/stats', asyncHandler(userController.getUserStats));

// Protected routes
router.put(
  '/profile',
  verifyJWT,
  asyncHandler(userController.updateProfile)
);

router.post(
  '/:userId/follow',
  verifyJWT,
  asyncHandler(userController.followUser)
);

router.post(
  '/:userId/unfollow',
  verifyJWT,
  asyncHandler(userController.unfollowUser)
);

module.exports = router;
