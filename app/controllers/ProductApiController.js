const StatusCode = require('../helper/StatusCode')
const Product = require('../model/productApiModel')

class ProductApiController {
    // Create a new product
    async createProduct(req, res) {
        try {
            const { name, description, price, category , inStock } = req.body;

            // Validate required fields
            if (!name || !price) {
                return res.status(StatusCode.BAD_REQUEST).json({
                    success: false,
                    message: 'Name and Price are required...'
                });
            }
            const data = new Product({
                name, 
                description, 
                price,
                category , 
                inStock
            })
            
            // Save the product to the database
            await data.save()
            return res.status(StatusCode.CREATED).json({
                success: true,
                message: 'Product created successfully',
                data: data
            })

        } catch (error) {
            return res.status(StatusCode.SERVER_ERROR).json({
                success: false,
                message: error.message

            })

        }
    }

 // Get all products
    async getAllProducts(req, res) {
        try {
            const products = await Product.find(); 
            res.status(StatusCode.OK).json(products);
        } catch (error) {
            res.status(StatusCode.SERVER_ERROR).json({ message: "Error fetching products", error });
        }
    }

// Get a single product by ID
    async getSingleProduct(req, res) {
        try {
            const id = req.params.id
            const data = await Product.findById(id)
             // Check if product exists
            if (!data) {
                return res.status(StatusCode.NOT_FOUND).json({
                    success: false,
                    message: 'Product not found'
                });
            }

            return res.status(StatusCode.OK).json({
                success: true,
                message: 'get single data successfully',
                data

            })
        } catch (error) {
            return res.status(StatusCode.SERVER_ERROR).json({
                success: false,
                message: error.message
            })
        }
    }


// Update a product by ID
    async updateProduct(req, res) {
        try {

            const id = req.params.id;
            const data = await Product.findByIdAndUpdate(
                id,
                req.body,
                { new: true } 
            );
// Check if product exists
            if (!data) {
                return res.status(StatusCode.NOT_FOUND).json({
                    success: false,
                    message: 'Product not found'
                });
            }
// Return success response
            return res.status(StatusCode.OK).json({
                success: true,
                message: 'updated product successfully',
                data
            })

        } catch (error) {
            return res.status(StatusCode.SERVER_ERROR).json({
                success: false,
                message: error.message
            })
        }
    }

// Delete a product by ID
    async deleteProduct(req, res) {
        try {
            const id = req.params.id;
            const data = await Product.findByIdAndDelete(id);

            if (!data) {
                return res.status(StatusCode.NOT_FOUND).json({
                    success: false,
                    message: 'Product not found'
                });
            }
            return res.status(StatusCode.OK).json({
                success: true,
                message: 'Product deleted successfully',
            })
            
        } catch (error) {
            return res.status(StatusCode.SERVER_ERROR).json({
                success: false,
                message: "Error deleting product", error
            });
        }
    }

}

module.exports = new ProductApiController