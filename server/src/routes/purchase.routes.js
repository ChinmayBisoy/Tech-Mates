const express = require('express');
const { verifyJWT, requireRole } = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');
const purchaseController = require('../controllers/purchase.controller');
const {
  initiatePurchaseSchema,
  raiseDisputeSchema,
  respondDisputeSchema,
  resolveDisputeSchema,
} = require('../validators/purchase.validator');

const router = express.Router();

router.post(
  '/',
  verifyJWT,
  requireRole('client'),
  validate(initiatePurchaseSchema),
  purchaseController.initiatePurchase
);

router.get('/my', verifyJWT, requireRole('client'), purchaseController.getMyPurchases);
router.get('/:id', verifyJWT, requireRole('client'), purchaseController.getPurchaseById);
router.get('/:id/download', verifyJWT, requireRole('client'), purchaseController.getDownloadLink);

router.post(
  '/dispute',
  verifyJWT,
  requireRole('client'),
  validate(raiseDisputeSchema),
  purchaseController.raiseDispute
);

router.put(
  '/dispute/:id/respond',
  verifyJWT,
  requireRole('developer'),
  validate(respondDisputeSchema),
  purchaseController.respondToDispute
);

router.put(
  '/dispute/:id/resolve',
  verifyJWT,
  requireRole('admin'),
  validate(resolveDisputeSchema),
  purchaseController.resolveDispute
);

module.exports = router;
