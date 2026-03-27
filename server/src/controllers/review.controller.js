const Review = require('../models/review.model');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');

const createReview = asyncHandler(async (req, res) => {
  const { revieweeId, contractId, rating, communication, deliveryQuality, professionalism, comment, isAnonymous } = req.body;

  if (!revieweeId || !contractId || !rating) {
    throw new ApiError(400, 'revieweeId, contractId, and rating are required');
  }

  if (rating < 1 || rating > 5) {
    throw new ApiError(400, 'Rating must be between 1 and 5');
  }

  const existingReview = await Review.findOne({
    reviewerId: req.user._id,
    revieweeId,
    contractId,
  });

  if (existingReview) {
    throw new ApiError(400, 'You have already reviewed this user for this contract');
  }

  const review = await Review.create({
    reviewerId: req.user._id,
    revieweeId,
    contractId,
    rating,
    communication,
    deliveryQuality,
    professionalism,
    comment,
    isAnonymous,
  });

  const populatedReview = await review.populate('reviewerId revieweeId');

  res.status(201).json(new ApiResponse(201, populatedReview, 'Review created successfully'));
});

const getReviews = asyncHandler(async (req, res) => {
  const { userId, page = 1, limit = 10 } = req.query;

  if (!userId) {
    throw new ApiError(400, 'userId is required');
  }

  const skip = (page - 1) * limit;

  const [reviews, total] = await Promise.all([
    Review.find({ revieweeId: userId, verified: true })
      .populate('reviewerId', 'name profilePhoto')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    Review.countDocuments({ revieweeId: userId, verified: true }),
  ]);

  res.json(new ApiResponse(200, {
    reviews,
    pagination: {
      total,
      pages: Math.ceil(total / limit),
      currentPage: Number(page),
    },
  }, 'Reviews fetched successfully'));
});

const updateReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    throw new ApiError(404, 'Review not found');
  }

  if (review.reviewerId.toString() !== req.user._id.toString()) {
    throw new ApiError(403, 'You can only update your own reviews');
  }

  Object.assign(review, req.body);
  await review.save();

  res.json(new ApiResponse(200, review, 'Review updated successfully'));
});

const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    throw new ApiError(404, 'Review not found');
  }

  if (review.reviewerId.toString() !== req.user._id.toString()) {
    throw new ApiError(403, 'You can only delete your own reviews');
  }

  await Review.findByIdAndDelete(req.params.id);

  res.json(new ApiResponse(200, {}, 'Review deleted successfully'));
});

module.exports = {
  createReview,
  getReviews,
  updateReview,
  deleteReview,
};
