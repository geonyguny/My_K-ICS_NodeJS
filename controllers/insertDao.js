const { pool } = require("../dbConfig");
const readXlsxFile = require('read-excel-file/node');

// 조회화면
exports.getKics = async function (req,res) {
    const[rows, fields] = await pool.query('SELECT * FROM LTerm_Summary');
    res.render('form.ejs', {content: rows})
};

// excel 데이터 DB 입력
exports.insertKics = async function (exFile) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);

        try{
            // 장기손보 원수/수재보험 CF엔진 산출데이터 불러오기
            readXlsxFile(exFile,{ sheet:1 }).then((rows) => {
                rows.shift()       
                let sql = 'INSERT INTO `LTerm_CF_DT` VALUES ?'
                connection.query(sql,[rows],(error,response)=>{
                    console.log(error || response)       
                })
            })     
                
            // 장기손보 출재보험 CF엔진 산출데이터 불러오기
            readXlsxFile(exFile,{ sheet:2 }).then((rows) => {
                rows.shift()       
                let sql = 'INSERT INTO `LTerm_RECF_DT` VALUES ?'
                connection.query(sql,[rows],(error,response)=>{
                    console.log(error || response)       
                })
            }) 

            // 장기손보 대재해위험 기초자료 불러오기 : 대재해구분 코드별로 SUM SORT 되어있는 기초자료 가정        
            readXlsxFile(exFile,{ sheet:3 }).then((rows) => {
                rows.shift()       
                let sql = 'INSERT INTO `LTerm_CAT_DT` VALUES ?'
                connection.query(sql,[rows],(error,response)=>{
                    console.log(error || response)       
                })
            }) 

            // 장기손보 기타 입력자료 불러오기: 보험미결금액 등 
            readXlsxFile(exFile,{ sheet:4 }).then((rows) => {
                rows.shift()       
                let sql = 'INSERT INTO `LTerm_Oth_DT` VALUES ?'
                connection.query(sql,[rows],(error,response)=>{
                    console.log(error || response)       
                })
            }) 
            connection.release();
            
        } catch (err) {
            console.error(" ##### Insert from Excel Query Error ##### ");
            connection.release();
            return false;
          }
    } catch (err) {
        console.error("##### DB Access Error #####");
        return false;
    }
};