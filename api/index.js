const express = require('express');
const app = express();
const dotenv = require('dotenv');


dotenv.config();
app.use(express.json());
app.use(express.urlencoded({extended: true}))





const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');


const {MongoClient} = require('mongodb');
app.use(express.static(__dirname + '/public'))

let db;
let sample;

new MongoClient(url).connect().then((client)=>{
  db = client.db("board");
  sample = client.db("sample_training")
  console.log("DB 연결 완료!!")
  app.listen(process.env.SERVER_PORT, ()=>{
    console.log(`${process.env.SERVER_PORT}번호에서 서버 실행 중`)
  })
}).catch((error)=>{
  console.log(error)
})


app.get('/', (req,res)=>{
  // res.send(process.env.API_KEY);
  res.send("되나?")
  // res.sendFile(__dirname + '/page/index.html')
})

module.exports = app;