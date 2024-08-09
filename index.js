const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/product.model.js');

const app = express();
app.use(express.json());

let PORT = process.env.PORT || 4000;



app.get('/', (req,res) => {
     res.send("Hello from Node API Server");
});

app.post('/api/products', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({message:error.message});
  }
});

app.get('/api/products', async (req, res)=> {
  try {
      const products = await Product.find({});
      res.status(200).json(products);
  } catch (error) {
      res.status(500).json({message: error.message});
  }
});

app.get('/api/product/:id', async (req, res)=> {
  try {
    const {id} = req.params;
      const product = await Product.findById(id);
      res.status(200).json(product);
  } catch (error) {
      res.status(500).json({message: error.message});
  }
});

// update
app.put('/api/product/:id', async (req, res)=> {
  try {
    const {id} = req.params;
      const product = await Product.findByIdAndUpdate(id, req.body);
      
      if(!product){
        return res.status(404).json({message:"Product not found"});
      }
      const updatedProduct = await Product.findById(id);

      res.status(200).json(updatedProduct);
  } catch (error) {
      res.status(500).json({message: error.message});
  }
});


mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('Connected to Database!'))
  .catch(()=>{
    console.log('Connection failed!');
});

  

app.listen(PORT,()=> {
    console.log(`Server running on port ${PORT}`);
})
