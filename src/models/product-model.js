// Define model schema for score
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');

const ProductSchema = new Schema({
    productName: { type: String, maxLength: 255 },
    information: { type: String },
    category: {
        type: String,
        required: true,
        enum: ['Phone', 'Laptop', 'Watch', 'Tablet', 'Accessory'],
    },
    price: { type: Number, required: true },
    imgUrl: { type: String },
});

// Add plugin
mongoose.plugin(slug);

module.exports = mongoose.model('Product', ProductSchema);
