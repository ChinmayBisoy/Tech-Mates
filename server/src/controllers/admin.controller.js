const User = require('../models/user.model');
const Requirement = require('../models/requirement.model');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');

const getAllUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, role, status } = req.query;

  if (req.user.role !== 'admin') {
    throw new ApiError(403, 'Admin access required');
  }

  const skip = (page - 1) * limit;
  const query = {};

  if (role) {
    query.role = role;
  }
  if (status) {
    query.status = status;
  }

  const [users, total] = await Promise.all([
    User.find(query)
      .select('-password -refreshToken')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    User.countDocuments(query),
  ]);

  res.json(new ApiResponse(200, {
    users,
    pagination: {
      total,
      pages: Math.ceil(total / limit),
      currentPage: Number(page),
    },
  }, 'Users fetched successfully'));
});

const updateUserStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  if (req.user.role !== 'admin') {
    throw new ApiError(403, 'Admin access required');
  }

  if (!status || !['active', 'banned', 'suspended'].includes(status)) {
    throw new ApiError(400, 'Invalid status');
  }

  const user = await User.findByIdAndUpdate(
    req.params.userId,
    { status },
    { new: true }
  ).select('-password -refreshToken');

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  res.json(new ApiResponse(200, user, 'User status updated successfully'));
});

const verifyUser = asyncHandler(async (req, res) => {
  const { verified, verificationBadge } = req.body;

  if (req.user.role !== 'admin') {
    throw new ApiError(403, 'Admin access required');
  }

  const user = await User.findByIdAndUpdate(
    req.params.userId,
    { verified, verificationBadge },
    { new: true }
  ).select('-password -refreshToken');

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  res.json(new ApiResponse(200, user, 'User verified successfully'));
});

const getReports = asyncHandler(async (req, res) => {
  if (req.user.role !== 'admin') {
    throw new ApiError(403, 'Admin access required');
  }

  const Report = require('../models/report.model');

  const reports = await Report.find()
    .populate('reporterId reportedId', 'name email')
    .sort({ createdAt: -1 })
    .limit(50);

  res.json(new ApiResponse(200, reports, 'Reports fetched successfully'));
});

const getAdminStats = asyncHandler(async (req, res) => {
  if (req.user.role !== 'admin') {
    throw new ApiError(403, 'Admin access required');
  }

  const totalUsers = await User.countDocuments();
  const totalRequirements = await Requirement.countDocuments();
  const activeRequirements = await Requirement.countDocuments({ status: 'open' });

  const stats = {
    totalUsers,
    totalRequirements,
    activeRequirements,
    platformMetrics: {
      totalTransactions: 0,
      totalRevenue: 0,
    },
  };

  res.json(new ApiResponse(200, stats, 'Admin stats fetched successfully'));
});

module.exports = {
  getAllUsers,
  updateUserStatus,
  verifyUser,
  getReports,
  getAdminStats,
};
