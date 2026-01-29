const express=require('express');
const ProductApiController = require('../controllers/ProductApiController');
const Router=express.Router();

Router.post('/',ProductApiController.createProduct);
Router.get('/', ProductApiController.getAllProducts);
Router.get('/:id', ProductApiController.getSingleProduct);
Router.put('/:id', ProductApiController.updateProduct);
Router.delete('/:id', ProductApiController.deleteProduct);


module.exports=Router;