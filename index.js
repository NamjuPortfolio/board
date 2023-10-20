const express = require('express');
const app = express();


app.get('/', (req,res)=>{
  res.send("되나");
})

app.listen(5000)