const { pool } = require("../dbConfig");
const readXlsxFile = require('read-excel-file/node')
const multer = require('multer');


exports.insertKics = async function () {
    try {
        const connection = await pool.getConnection(async (conn) => conn);

        try{
            const storage = multer.diskStorage({
                destination: (req, file, cb) => {
                cb(null, __basedir + '/uploads/')
                },
                filename: (req, file, cb) => {
                cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
                },
            })
            const uploadFile = multer({ storage: storage })
            app.get('/', (req, res) => {
                res.sendFile(__dirname + '/index.html')
            })
            app.post('/import-excel', uploadFile.single('import-excel'), (req, res) => {
                importFileToDb(__basedir + '/uploads/' + req.file.filename)
                console.log(res)
            })
            function importFileToDb(exFile) {
                readXlsxFile(exFile).then((rows) => {
                rows.shift()
                database.connect((error) => {
                    if (error) {
                    console.error(error)
                    } else {
                    let query = 'INSERT INTO `LTerm_CF_DT` VALUES ?'
                    connection.query(query, [rows], (error, response) => {
                        console.log(error || response)
                    })
                    }
                })
                })                
            }
        } catch (err) {
            console.error(" ##### Insert from Excel Query Error ##### ");
            connection.release();
            return false;
          }
    } catch (err) {
        console.error("##### DB Access Error #####");
        return false;
    }
}


// exports.insertKics = async function () {
//     try {
//         const connection = await pool.getConnection(async (conn) => conn);

//         try{
//             // 장기손보 원수/수재보험 CF엔진 산출데이터 불러오기
//             readXlsxFile('KICS_DB.xlsx',{ sheet:1 }).then((rows) => {
//                 rows.shift()       
//                 let sql = 'INSERT INTO `LTerm_CF_DT` VALUES ?'
//                 connection.query(sql,[rows],(error,response)=>{
//                     console.log(error || response)       
//                 })
//             })     
                
//             // 장기손보 출재보험 CF엔진 산출데이터 불러오기
//             readXlsxFile('KICS_DB.xlsx',{ sheet:2 }).then((rows) => {
//                 rows.shift()       
//                 let sql = 'INSERT INTO `LTerm_RECF_DT` VALUES ?'
//                 connection.query(sql,[rows],(error,response)=>{
//                     console.log(error || response)       
//                 })
//             }) 

//             // 장기손보 대재해위험 기초자료 불러오기 : 대재해구분 코드별로 SUM SORT 되어있는 기초자료 가정        
//             readXlsxFile('KICS_DB.xlsx',{ sheet:3 }).then((rows) => {
//                 rows.shift()       
//                 let sql = 'INSERT INTO `LTerm_CAT_DT` VALUES ?'
//                 connection.query(sql,[rows],(error,response)=>{
//                     console.log(error || response)       
//                 })
//             }) 

//             // 장기손보 기타 입력자료 불러오기: 보험미결금액 등 
//             readXlsxFile('KICS_DB.xlsx',{ sheet:4 }).then((rows) => {
//                 rows.shift()       
//                 let sql = 'INSERT INTO `LTerm_Oth_DT` VALUES ?'
//                 connection.query(sql,[rows],(error,response)=>{
//                     console.log(error || response)       
//                 })
//             }) 
//             connection.release();
//         } catch (err) {
//             console.error(" ##### Insert from Excel Query Error ##### ");
//             connection.release();
//             return false;
//           }
//     } catch (err) {
//         console.error("##### DB Access Error #####");
//         return false;
//     }
// };