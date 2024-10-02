const express = require('express');
const productController = require('../controllers/product-controller');

const router = express.Router();

router.post('/', productController.createProduct);
router.get('/', productController.getListProducts);
router.get('/:productId', productController.getProductDetail);
router.put('/:productId', productController.updateProduct);
router.delete('/:productId', productController.deleteProduct);

module.exports = router;
