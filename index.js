// 모듈 require
const express = require('express');
// const fs = require('fs');
const cors = require('cors');
// const multer = require('multer');
const bodyParser = require('body-parser');
// const { pool } = require("./dbConfig");
// const insertDao = require("./controllers/insertDao");
// const queryDao = require("./controllers/queryDao");


// express 서버 사용
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// API 세팅
app.use('/api/kics',require('./routes/kicsRouter'));
// app.use('/', router)

// 라우터
// kicsRouter(app);

// app.listen(4000);
let nodeServer = app.listen(4000, function () {
    let port = nodeServer.address().port
    let host = nodeServer.address().address
    console.log('App working on: ', host, port)
})
