const express = require('express')
const mongoose = require('mongoose');
const app = express()



app.get('/', (req,res) => {
     res.send("Hello from Node API Server");
});

mongoose.connect('mongodb+srv://ibnmudi:gvhwpnHF89u265vC@backend.yhszl.mongodb.net/?retryWrites=true&w=majority&appName=backend')
  .then(() => console.log('Connected to Database!'))
  .catch(()=>{
    console.log('Connection failed!');
  });

  

app.listen(4000,()=> {
    console.log('Server running on port 4000');
})
