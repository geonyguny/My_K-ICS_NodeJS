const connection = require('../dbConfig')
const readXlsxFile = require('read-excel-file/node')
const xlsxReader = require('xlsx')
const workbook = xlsxReader.readFile('sample.xlsx')


//control get / insert
const kicsCtrl = {
    getKics : async (req,res) =>{
        connection.query('SELECT * FROM LTerm_CE',(error,rows)=>{
            if(error) throw error;
            console.log(rows);
            res.send(rows);
        })
    },
    //readXlsxFile 로 작성한 구문
    insertKics : async (req,res)=>{
        readXlsxFile('KICS_DB.xlsx',{ sheet:1 }).then((rows) => {
            rows.shift()       
            let sql = 'INSERT INTO `LTerm_CE` VALUES ?'
            connection.query(sql,[rows],(error,response)=>{
                console.log(error || response)       
            })
        })     
        
        readXlsxFile('KICS_DB.xlsx',{ sheet:2 }).then((rows) => {
            rows.shift()       
            let sql = 'INSERT INTO `LTerm_Risk` VALUES ?'
            connection.query(sql,[rows],(error,response)=>{
                console.log(error || response)       
            })
        })     

        readXlsxFile('KICS_DB.xlsx',{ sheet:3 }).then((rows) => {
            rows.shift()       
            let sql = 'INSERT INTO `LTerm_CatRisk` VALUES ?'
            connection.query(sql,[rows],(error,response)=>{
                console.log(error || response)       
            })
        })     
        
        readXlsxFile('KICS_DB.xlsx',{ sheet:4 }).then((rows) => {
            rows.shift()       
            let sql = 'INSERT INTO `LTerm_Cat_DST` VALUES ?'
            connection.query(sql,[rows],(error,response)=>{
                console.log(error || response)       
            })
        })     

        readXlsxFile('KICS_DB.xlsx',{ sheet:5 }).then((rows) => {
            rows.shift()       
            let sql = 'INSERT INTO `LTerm_Risk_SUM` VALUES ?'
            connection.query(sql,[rows],(error,response)=>{
                console.log(error || response)       
            })
        })     

        readXlsxFile('KICS_DB.xlsx',{ sheet:6 }).then((rows) => {
            rows.shift()       
            let sql = 'INSERT INTO `LTerm_RM` VALUES ?'
            connection.query(sql,[rows],(error,response)=>{
                console.log(error || response)       
            })
        })     


    }
}
// connection.end();
module.exports = kicsCtrl;

//   // import db from excel
//   let workbook = xlsx.readFile('sample.xlsx')
//   let worksheet = workbook.Sheets[workbook.SheetNames[0]]
//   let range = xlsx.utils.decode_range(worksheet["!ref"])

//   for(let row = range.s.r;row<=range.e.r;row++){
//       let data = []
  
//       for(let col = range.s.c;col<=range.e.c;col++){
//           let cell = worksheet[xlsx.utils.encode_cell({r:row, c:col})];
//           data.push(cell.v);
//       }
  
//   console.log(data)
//   // javascript 구조분해할당
//   // const {id,name,country} = req.body;


// //readXlsxFile 로 작성한 구문
// insertKics : async (req,res)=>{
//     readXlsxFile('sample.xlsx').then((rows) => {
//         rows.shift()       
//         let sql = 'INSERT INTO `kicsID` (`ID`,`name`,`country`) VALUES ?'
//         connection.query(sql,[rows],(error,response)=>{
//             console.log(error || response)       
//         })
//     })        
// }


// //xlsx 로 작성한 구문 , postman에서 post 하면 에러발생
// insertKics : async (req,res)=>{

//     let data = []
//     let sql = 'INSERT INTO `kicsID` (`ID`,`name`,`country`) VALUES ?'
//     const sheets = workbook.SheetNames

//     for(let i =0;i<sheets.length;i++){
//         const temp = xlsxReader.utils.sheet_to_json(
//             workbook.Sheets[workbook.SheetNames[i]]
//         )
//         temp.forEach((res)=>{
//             data.push(res)
//             console.log(res)
//         })
//     }
//         connection.query(sql,[res],(error,response)=>{
//             console.log(error || response)       
//         })
//     }  