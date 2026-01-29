const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    
    description: {
        type: String,
    },

    price: {
        type: Number,
        required: true
    },

    category: {
        type: String,
        trim: true
    },

    inStock: { 
        type: Boolean, 
        default: true 
    }
},
    {
        timestamps: true

    })


const ProductModel = mongoose.model('product', ProductSchema)

module.exports = ProductModel