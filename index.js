const express = require('express')
const mongoose = require('mongoose');
const app = express()

let PORT = process.env.PORT || 4000;


app.get('/', (req,res) => {
     res.send("Hello from Node API Server");
});

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('Connected to Database!'))
  .catch(()=>{
    console.log('Connection failed!');
  });

  

app.listen(PORT,()=> {
    console.log(`Server running on port ${PORT}`);
})
