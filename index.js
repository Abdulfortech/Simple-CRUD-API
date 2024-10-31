const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/product.model.js');
const productRoute = require('./routes/product.route.js');
const app = express();

let PORT = process.env.PORT || 4000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// routes
app.use('/api/products', productRoute);


mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('Connected to Database!'))
  .catch(()=>{
    console.log('Connection failed!');
});

  

app.listen(PORT,()=> {
    console.log(`Server running on port ${PORT}`);
})
