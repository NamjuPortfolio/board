const express = require('express');
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', async (req, res) => {
  res.send("테스트");
});
