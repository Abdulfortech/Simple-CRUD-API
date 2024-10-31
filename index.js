const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/product.model.js');

let PORT = process.env.PORT || 4000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// routes
app.use('/api/products', productRoutes);


app.get('/', (req,res) => {
     res.send("Hello from Node API Server");
});

app.post('/api/products', async (req, res) => {
  
});

app.get('/api/products', async (req, res)=> {
  try {
      const products = await Product.find({});
      res.status(200).json(products);
  } catch (error) {
      res.status(500).json({message: error.message});
  }
});

app.get('/api/products/:id', async (req, res)=> {
  try {
    const {id} = req.params;
      const product = await Product.findById(id);
      res.status(200).json(product);
  } catch (error) {
      res.status(500).json({message: error.message});
  }
});

// update
app.put('/api/products/:id', async (req, res)=> {
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

// delete 
app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    const product = await Product.findByIdAndDelete(id);

    if(!product){
      return res.status(404).json({ message:"Product not found" });
    }

    return res.status(200).json({ message: "Product Deleted successfully"})
    
  } catch (error) {
    res.status(500).json({ message: error.message});
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
