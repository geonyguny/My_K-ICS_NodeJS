// const { pool } = require("../dbConfig");
// const insertDao = require(".insertDao");

// // upload
// pool.getConnection(function (err) {
//     if (err) {
//       return console.error('error: ' + err.message)
//     }
//     console.log('Database connected.')
//   })
//   const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null,  'uploads')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now())
//     }
//   });
//   const uploadFile = multer({ storage: storage })
//   app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/views/form.ejs')
//   })
//   app.post('/import-excel', uploadFile.single('import-excel'), (req, res, next) => {
//     insertDao.insertKics(__dirname + '/uploads/' + req.file.filename)  
//   })

// // exports.uploadExcel = async function () {
// //     try {
// //         const connection = await pool.getConnection(async (conn) => conn);
  
// //         try{
// //           const storage = multer.diskStorage({
// //             destination: function (req, file, cb) {
// //               cb(null,  'uploads')
// //             },
// //             filename: function (req, file, cb) {
// //               cb(null, file.fieldname + '-' + Date.now())
// //             }
// //           });
// //           const uploadFile = multer({ storage: storage })
// //           app.get('/', (req, res) => {
// //             res.sendFile(__dirname + '/views/form.ejs')
// //           })
// //           app.post('/import-excel', uploadFile.single('import-excel'), (req, res, next) => {
// //             res.status(200).send({
// //                 message: "Ok",
// //                 fileInfo: req.file
// //             })
// //             importFileToDb(__dirname + '/uploads/' + req.file.filename)
// //           })
        
// //           function importFileToDb(exFile) {
// //             readXlsxFile(exFile).then((rows) => {
// //               rows.shift()
// //               console.log(rows[1])
// //               pool.query('INSERT INTO `LTerm_CF_DT` VALUES ?',[rows],(error,results)=>{
// //                 if(error) throw error;
// //                 console.log(results[0])
// //               })
// //             })
// //           }
  
// //         } catch (err) {
// //           console.error(" ##### Insert From DB Query Error ##### ");
// //           return false;
// //           }
// //       }catch (err) {
// //         console.error("##### DB Access Error #####");
// //         return false;
// //       }
// //   }