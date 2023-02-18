// 모듈 require
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const { hostname } = require('os');


// express 서버 사용
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(cors())
app.use(express.static('public'));

// 포트 체크
app.listen(4000);

// API 세팅
app.use('/api/kics',require('./routes/kicsRouter'));