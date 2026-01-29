require('dotenv').config();
const express=require('express');
const ejs=require('ejs');
const path=require('path');
const DbConnection=require('./app/config/db');

const app=express();
// Database Connection
DbConnection();

//static files
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')))

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}))

//API Routes
const productApiRoute=require('./app/router/productApiRouter');
app.use('/api/products', productApiRoute)

//Server
const port=7000;
app.listen(port,()=>{
    console.log(`server is running on port: http://localhost:${port}`);
})