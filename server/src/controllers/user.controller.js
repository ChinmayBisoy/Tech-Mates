const User = require('../models/user.model');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password -refreshToken');
  
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  res.json(new ApiResponse(200, user, 'User profile fetched successfully'));
});

const updateProfile = asyncHandler(async (req, res) => {
  const allowedFields = ['name', 'bio', 'profilePhoto', 'location', 'skills'];
  const updates = {};

  allowedFields.forEach(field => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });

  const user = await User.findByIdAndUpdate(
    req.user._id,
    updates,
    { new: true, runValidators: true }
  ).select('-password -refreshToken');

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  res.json(new ApiResponse(200, user, 'Profile updated successfully'));
});

const followUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (userId === req.user._id.toString()) {
    throw new ApiError(400, 'You cannot follow yourself');
  }

  const targetUser = await User.findById(userId);
  if (!targetUser) {
    throw new ApiError(404, 'User not found');
  }

  if (!targetUser.followers) {
    targetUser.followers = [];
  }

  if (targetUser.followers.includes(req.user._id)) {
    throw new ApiError(400, 'You already follow this user');
  }

  targetUser.followers.push(req.user._id);
  await targetUser.save();

  res.json(new ApiResponse(200, targetUser, 'User followed successfully'));
});

const unfollowUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const targetUser = await User.findById(userId);
  if (!targetUser) {
    throw new ApiError(404, 'User not found');
  }

  if (!targetUser.followers) {
    targetUser.followers = [];
  }

  targetUser.followers = targetUser.followers.filter(
    followerId => followerId.toString() !== req.user._id.toString()
  );
  await targetUser.save();

  res.json(new ApiResponse(200, targetUser, 'User unfollowed successfully'));
});

const getUserReviews = asyncHandler(async (req, res) => {
  const Review = require('../models/review.model');
  
  const reviews = await Review.find({ revieweeId: req.params.id })
    .sort({ createdAt: -1 });

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(2)
    : 0;

  res.json(new ApiResponse(200, { reviews, averageRating }, 'Reviews fetched successfully'));
});

const getUserStats = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  const stats = {
    totalFollowers: user.followers?.length || 0,
    totalProjects: user.totalProjects || 0,
    totalEarnings: user.totalEarnings || 0,
    successRate: user.successRate || 0,
  };

  res.json(new ApiResponse(200, stats, 'User stats fetched successfully'));
});

const getAllDevelopers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 12, search = '', skills = '', tier = '' } = req.query;
  
  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
  const skip = (pageNum - 1) * limitNum;

  const query = { role: 'developer' };

  // Search by name, email, or bio
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { bio: { $regex: search, $options: 'i' } },
    ];
  }

  // Filter by skills
  if (skills) {
    const skillArray = skills.split(',').map(s => s.trim());
    query.skills = { $in: skillArray };
  }

  // Filter by tier
  if (tier && ['elite', 'professional', 'beginner'].includes(tier)) {
    query.tier = tier;
  }

  const [developers, total] = await Promise.all([
    User.find(query)
      .select('-password -refreshToken')
      .sort({ avgRating: -1, createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .lean(),
    User.countDocuments(query),
  ]);

  res.json(
    new ApiResponse(
      200,
      developers,
      'Developers fetched successfully',
      {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      }
    )
  );
});

module.exports = {
  getUserProfile,
  updateProfile,
  followUser,
  unfollowUser,
  getUserReviews,
  getUserStats,
  getAllDevelopers,
};
