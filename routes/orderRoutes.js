const express = require('express');
const { addOrderItems, getOrderById, updateOrderToPaid, updateOrderToDelivered, getMyOrders } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Sipariş rotaları
router.route('/').post(protect, addOrderItems);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, updateOrderToDelivered);

module.exports = router;
