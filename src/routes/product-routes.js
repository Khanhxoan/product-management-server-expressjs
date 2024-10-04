const express = require('express');
const productController = require('../controllers/product-controller');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', protect, productController.createProduct);
router.get('/', productController.getListProducts);
router.get('/:productId', productController.getProductDetail);
router.put('/:productId', protect, productController.updateProduct);
router.delete('/:productId', protect, productController.deleteProduct);

module.exports = router;
