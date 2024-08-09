const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config();
const app = express()

let PORT = process.env.PORT || 4000;


app.get('/', (req,res) => {
     res.send("Hello from Node API Server");
});

app.post('/api/products', (req, res) => {
  res.send("Data Received")
});

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('Connected to Database!'))
  .catch(()=>{
    console.log('Connection failed!');
  });

  

app.listen(PORT,()=> {
    console.log(`Server running on port ${PORT}`);
})
