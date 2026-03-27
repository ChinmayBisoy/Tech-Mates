import axios from './axios';

// Fetch all purchases for current user
export const fetchMyPurchases = async (page = 1, limit = 10, status = null) => {
  const response = await axios.get(`/purchases`, {
    params: { page, limit, ...(status && { status }) },
  });
  return response.data;
};

// Get purchase by ID
export const getPurchase = async (purchaseId) => {
  const response = await axios.get(`/purchases/${purchaseId}`);
  return response.data;
};

// Get purchase by session ID (for checkout success flow)
export const getPurchaseBySession = async (sessionId) => {
  const response = await axios.get(`/purchases/session/${sessionId}`);
  return response.data;
};

// Create a purchase (initiate checkout)
export const createPurchase = async (listingId) => {
  const response = await axios.post(`/purchases`, { listingId });
  return response.data;
};

// Download purchased listing files
export const downloadPurchasedFiles = async (purchaseId) => {
  const response = await axios.get(`/purchases/${purchaseId}/download`, {
    responseType: 'blob',
  });
  return response.data;
};

// Get GitHub access link
export const getGitHubAccess = async (purchaseId) => {
  const response = await axios.get(`/purchases/${purchaseId}/github-access`);
  return response.data;
};

// Request refund
export const requestRefund = async (purchaseId, reason) => {
  const response = await axios.post(`/purchases/${purchaseId}/refund`, { reason });
  return response.data;
};

// Leave review for purchase
export const leavePurchaseReview = async (purchaseId, data) => {
  const response = await axios.post(`/purchases/${purchaseId}/review`, data);
  return response.data;
};

// Verify purchase session (called after payment redirect)
export const verifyPurchaseSession = async (sessionId) => {
  const response = await axios.post(`/purchases/verify-session`, { sessionId });
  return response.data;
};

// Request support for purchase
export const requestPurchaseSupport = async (purchaseId, support) => {
  const response = await axios.post(`/purchases/${purchaseId}/support`, support);
  return response.data;
};

// Cancel purchase (if applicable)
export const cancelPurchase = async (purchaseId, reason) => {
  const response = await axios.post(`/purchases/${purchaseId}/cancel`, { reason });
  return response.data;
};

// Get purchase statistics (for sellers)
export const getPurchaseStats = async (listingId) => {
  const response = await axios.get(`/purchases/listing/${listingId}/stats`);
  return response.data;
};
