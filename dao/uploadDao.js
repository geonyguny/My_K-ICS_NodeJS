const { pool } = require("./dbConfig");
const insertDao = require("./controllers/insertDao");
const express = require('express')
const multer = require('multer')
const app = express()

exports.uploadExcel = async function () {
  try {
      const connection = await pool.getConnection(async (conn) => conn);
      
      try{
        const storage = multer.diskStorage({
          destination: function (req, file, cb) {
            cb(null,  'uploads')
          },
          filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now())
          }
        });
        console.log('1')
        const uploadFile = multer({ storage: storage })
          app.get('/', (req, res) => {
            res.sendFile(__dirname + '/views/form.ejs')
          })
          console.log('2')
          app.post('/import-excel', uploadFile.single('import-excel'), (req, res, next) => {
            insertDao.insertKics(__dirname + '/uploads/' + req.file.filename)
          })
          connection.release();
          console.log('3')
      } catch (err) {
          console.error(" ##### Upload from Excel Query Error ##### ");
          connection.release();
          return false;
        }
    } catch (err) {
      console.error("##### DB Access Error #####");
      return false;
    }
};