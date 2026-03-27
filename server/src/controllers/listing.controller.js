const Listing = require('../models/listing.model');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');

const createListing = asyncHandler(async (req, res) => {
  const { title, description, category, price, tags, fileUrl } = req.body;

  if (!title || !description || !category || !price) {
    throw new ApiError(400, 'title, description, category, and price are required');
  }

  const listing = await Listing.create({
    title,
    description,
    category,
    price,
    tags,
    fileUrl,
    sellerId: req.user._id,
  });

  res.status(201).json(new ApiResponse(201, listing, 'Listing created successfully'));
});

const getListings = asyncHandler(async (req, res) => {
  const { page = 1, limit = 12, category, search, sortBy = 'newest' } = req.query;

  const skip = (page - 1) * limit;
  const query = { status: 'active', visibility: 'public' };

  if (category) {
    query.category = category;
  }

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  let sortOption = {};
  switch (sortBy) {
    case 'price_asc':
      sortOption = { price: 1 };
      break;
    case 'price_desc':
      sortOption = { price: -1 };
      break;
    case 'rating':
      sortOption = { rating: -1 };
      break;
    default:
      sortOption = { createdAt: -1 };
  }

  const [listings, total] = await Promise.all([
    Listing.find(query)
      .populate('sellerId', 'name profilePhoto')
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit)),
    Listing.countDocuments(query),
  ]);

  res.json(new ApiResponse(200, {
    listings,
    pagination: {
      total,
      pages: Math.ceil(total / limit),
      currentPage: Number(page),
    },
  }, 'Listings fetched successfully'));
});

const getListingDetail = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id).populate('sellerId', 'name profilePhoto bio');

  if (!listing) {
    throw new ApiError(404, 'Listing not found');
  }

  res.json(new ApiResponse(200, listing, 'Listing fetched successfully'));
});

const updateListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    throw new ApiError(404, 'Listing not found');
  }

  if (listing.sellerId.toString() !== req.user._id.toString()) {
    throw new ApiError(403, 'You can only update your own listings');
  }

  const allowedFields = ['title', 'description', 'category', 'price', 'tags', 'images'];
  allowedFields.forEach(field => {
    if (req.body[field] !== undefined) {
      listing[field] = req.body[field];
    }
  });

  await listing.save();

  res.json(new ApiResponse(200, listing, 'Listing updated successfully'));
});

const deleteListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    throw new ApiError(404, 'Listing not found');
  }

  if (listing.sellerId.toString() !== req.user._id.toString()) {
    throw new ApiError(403, 'You can only delete your own listings');
  }

  listing.status = 'delisted';
  await listing.save();

  res.json(new ApiResponse(200, {}, 'Listing deleted successfully'));
});

const purchaseListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    throw new ApiError(404, 'Listing not found');
  }

  // Create purchase record
  const Purchase = require('../models/purchase.model');
  const purchase = await Purchase.create({
    buyerId: req.user._id,
    listingId: req.params.id,
    amount: listing.price,
    status: 'completed',
  });

  // Update listing
  listing.purchaseCount += 1;
  await listing.save();

  res.status(201).json(new ApiResponse(201, purchase, 'Listing purchased successfully'));
});

module.exports = {
  createListing,
  getListings,
  getListingDetail,
  updateListing,
  deleteListing,
  purchaseListing,
};
