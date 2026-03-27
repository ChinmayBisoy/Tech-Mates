const express = require('express');
const listingController = require('../controllers/listing.controller');
const { verifyJWT } = require('../middleware/auth.middleware');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

// Public routes
router.get('/', asyncHandler(listingController.getListings));
router.get('/:id', asyncHandler(listingController.getListingDetail));

// Protected routes
router.post(
  '/',
  verifyJWT,
  asyncHandler(listingController.createListing)
);

router.put(
  '/:id',
  verifyJWT,
  asyncHandler(listingController.updateListing)
);

router.delete(
  '/:id',
  verifyJWT,
  asyncHandler(listingController.deleteListing)
);

router.post(
  '/:id/purchase',
  verifyJWT,
  asyncHandler(listingController.purchaseListing)
);

module.exports = router;
