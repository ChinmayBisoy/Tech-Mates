import axios from './axios';

/**
 * Purchase Dashboard API
 */
export const myPurchasesAPI = {
  // Get user's purchases
  getMyPurchases: async (page = 1, limit = 12, filters = {}) => {
    const response = await axios.get('/purchases/my', {
      params: { page, limit, ...filters },
    });
    return response.data;
  },

  // Get purchase detail
  getPurchaseDetail: async (purchaseId) => {
    const response = await axios.get(`/purchases/${purchaseId}`);
    return response.data;
  },

  // Download purchase file
  downloadFile: async (purchaseId) => {
    const response = await axios.get(`/purchases/${purchaseId}/download`, {
      responseType: 'blob',
    });
    return response.data;
  },

  // Leave review on purchase
  leavePurchaseReview: async (purchaseId, review) => {
    const response = await axios.post(`/purchases/${purchaseId}/review`, review);
    return response.data;
  },

  // Request support
  requestSupport: async (purchaseId, message) => {
    const response = await axios.post(`/purchases/${purchaseId}/support`, { message });
    return response.data;
  },

  // Request refund
  requestRefund: async (purchaseId, reason) => {
    const response = await axios.post(`/purchases/${purchaseId}/refund`, { reason });
    return response.data;
  },
};

/**
 * Listings Dashboard API
 */
export const myListingsAPI = {
  // Get user's listings
  getMyListings: async (page = 1, limit = 12, filters = {}) => {
    const response = await axios.get('/listings/my', {
      params: { page, limit, ...filters },
    });
    return response.data;
  },

  // Get listing detail
  getListingDetail: async (listingId) => {
    const response = await axios.get(`/listings/${listingId}`);
    return response.data;
  },

  // Update listing
  updateListing: async (listingId, data) => {
    const response = await axios.put(`/listings/${listingId}`, data);
    return response.data;
  },

  // Delete listing
  deleteListing: async (listingId) => {
    const response = await axios.delete(`/listings/${listingId}`);
    return response.data;
  },

  // Get listing stats (purchases, revenue, etc)
  getListingStats: async (listingId) => {
    const response = await axios.get(`/listings/${listingId}/stats`);
    return response.data;
  },

  // Get all listings stats
  getAllListingsStats: async () => {
    const response = await axios.get('/listings/stats');
    return response.data;
  },
};

/**
 * Review & Rating API
 */
export const reviewAPI = {
  // Get reviews for listing
  getListingReviews: async (listingId, page = 1, limit = 10, sort = 'recent') => {
    const response = await axios.get(`/listings/${listingId}/reviews`, {
      params: { page, limit, sort },
    });
    return response.data;
  },

  // Get reviews by user
  getMyReviews: async (page = 1, limit = 12) => {
    const response = await axios.get('/reviews/my', {
      params: { page, limit },
    });
    return response.data;
  },

  // Submit review
  submitReview: async (data) => {
    const response = await axios.post('/reviews', data);
    return response.data;
  },

  // Update review
  updateReview: async (reviewId, data) => {
    const response = await axios.put(`/reviews/${reviewId}`, data);
    return response.data;
  },

  // Delete review
  deleteReview: async (reviewId) => {
    const response = await axios.delete(`/reviews/${reviewId}`);
    return response.data;
  },

  // Get review statistics
  getReviewStats: async (listingId) => {
    const response = await axios.get(`/listings/${listingId}/reviews/stats`);
    return response.data;
  },
};

/**
 * Wishlist API
 */
export const wishlistAPI = {
  // Get user's wishlist
  getWishlist: async (page = 1, limit = 12) => {
    const response = await axios.get('/wishlist', {
      params: { page, limit },
    });
    return response.data;
  },

  // Add to wishlist
  addToWishlist: async (listingId) => {
    const response = await axios.post('/wishlist', { listingId });
    return response.data;
  },

  // Remove from wishlist
  removeFromWishlist: async (listingId) => {
    const response = await axios.delete(`/wishlist/${listingId}`);
    return response.data;
  },

  // Check if in wishlist
  isInWishlist: async (listingId) => {
    const response = await axios.get(`/wishlist/check/${listingId}`);
    return response.data;
  },

  // Clear wishlist
  clearWishlist: async () => {
    const response = await axios.delete('/wishlist');
    return response.data;
  },
};

/**
 * Seller Analytics API
 */
export const analyticsAPI = {
  // Get seller dashboard stats
  getDashboardStats: async (timeRange = '30d') => {
    const response = await axios.get('/analytics/dashboard', {
      params: { timeRange },
    });
    return response.data;
  },

  // Get revenue data
  getRevenueData: async (timeRange = '30d') => {
    const response = await axios.get('/analytics/revenue', {
      params: { timeRange },
    });
    return response.data;
  },

  // Get sales data
  getSalesData: async (timeRange = '30d') => {
    const response = await axios.get('/analytics/sales', {
      params: { timeRange },
    });
    return response.data;
  },

  // Get top listings
  getTopListings: async (limit = 5) => {
    const response = await axios.get('/analytics/top-listings', {
      params: { limit },
    });
    return response.data;
  },

  // Get customer feedback
  getCustomerFeedback: async (page = 1, limit = 10) => {
    const response = await axios.get('/analytics/feedback', {
      params: { page, limit },
    });
    return response.data;
  },

  // Get performance metrics
  getPerformanceMetrics: async (listingId) => {
    const response = await axios.get(`/analytics/listings/${listingId}/performance`);
    return response.data;
  },
};
