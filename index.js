const express = require('express');
const app = express();
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
const methodOverride = require('method-override');

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

let db;
let sample;

const withDB = async (handler) => {
  if (!db) {
    try {
      const client = new MongoClient(process.env.MONGODB_URI);
      await client.connect();
      db = client.db("board");
      sample = client.db("sample_training");
    } catch (error) {
      console.error('DB 연결 에러', error);
      throw new Error('DB 연결 에러');
    }
  }
  return handler(db, sample);
};

app.get('/', async (req, res) => {
  try {
    await withDB(async () => {
      res.send("DB 연결 완료, 동작 확인!");
    });
  } catch (error) {
    console.error('요청 처리 중 에러', error);
    res.status(500).send('내부 서버 오류');
  }
});

app.listen(5000)