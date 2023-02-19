// 모듈 require
const express = require('express');
const fs = require('fs');
const ejs = require('ejs')
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
const { pool } = require("./dbConfig");
const insertDao = require("./controllers/insertDao");
const queryDao = require("./controllers/queryDao");


// express 서버 사용
const app = express();
app.set('view engine', 'ejs')
app.set('views',__dirname+'/views')
app.set('ejs',ejs.renderFile)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// API 세팅
app.use('/api/kics',require('./routes/kicsRouter'));
// app.use('/', router)

// upload
pool.getConnection(function (err) {
  if (err) {
    return console.error('error: ' + err.message)
  }
  console.log('Database connected.')
})
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,  'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
});
const uploadFile = multer({ storage: storage })
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/form.ejs')
})
app.post('/import-excel', uploadFile.single('import-excel'), (req, res, next) => {
  console.log('1')
  insertDao.insertKics(__dirname + '/uploads/' + req.file.filename)
  console.log('2')
  // queryDao.queryKics()
  // console.log('3')
  // insertDao.getKics()
  // console.log('4')

})

// app.listen(4000);
let nodeServer = app.listen(4000, function () {
    let port = nodeServer.address().port
    let host = nodeServer.address().address
    console.log('App working on: ', host, port)
})
