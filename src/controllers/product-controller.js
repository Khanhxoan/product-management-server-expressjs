const ProductModel = require('../models/product-model');
const { multipleMongooseToObject } = require('../ultis/mongoose');

const defaultPage = 1;
const defaultPageSize = 10;

class ProductController {
    // [GET] /products
    getListProducts = async (req, res, next) => {
        try {
            const page = parseInt(req.query.page) || defaultPage;
            const size = parseInt(req.query.size) || defaultPageSize;
            const skip = (page - 1) * size;

            const products = await ProductModel.find().skip(skip).limit(size);
            const totalProducts = await ProductModel.countDocuments();

            res.json({
                page,
                totalPages: Math.ceil(totalProducts / size),
                totalProducts,
                products,
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    // [GET] /products/:productId
    getProductDetail = async (req, res) => {
        try {
            const { productId } = req.params;
            const product = await ProductModel.findById(productId);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(product);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    // [POST] /products
    createProduct = async (req, res) => {
        try {
            const payload = req.body;
            const product = new ProductModel(payload);
            await product.save();
            res.status(201).json(product);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };

    // [PUT] /products/:productId
    updateProduct = async (req, res) => {
        try {
            const { productId } = req.params;
            const payload = req.body;
            const product = await ProductModel.findByIdAndUpdate(
                productId,
                payload,
                { new: true },
            );
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(product);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };

    // [DELETE] /products/:productId
    deleteProduct = async (req, res) => {
        try {
            const { productId } = req.params;
            const product = await ProductModel.findByIdAndDelete(productId);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json({ message: 'Product deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
}

module.exports = new ProductController();
