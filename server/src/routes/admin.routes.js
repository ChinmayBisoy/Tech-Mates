const express = require('express');
const adminController = require('../controllers/admin.controller');
const { verifyJWT, requireRole } = require('../middleware/auth.middleware');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

// All admin routes require authentication and admin role
router.use(verifyJWT);
router.use(requireRole('admin'));

router.get('/users', asyncHandler(adminController.getAllUsers));

router.put(
  '/users/:userId/status',
  asyncHandler(adminController.updateUserStatus)
);

router.put(
  '/users/:userId/verify',
  asyncHandler(adminController.verifyUser)
);

router.get('/reports', asyncHandler(adminController.getReports));

router.get('/stats', asyncHandler(adminController.getAdminStats));

module.exports = router;
