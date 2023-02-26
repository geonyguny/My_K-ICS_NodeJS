const { pool } = require("../dbConfig");
const readXlsxFile = require('read-excel-file/node');
const ejs = require('ejs')
const express = require('express');

const app = express();
app.set('view engine', 'ejs')
app.set('views',__dirname+'/views')
app.set('ejs',ejs.renderFile)
var func = require('../js/common')


// 조회화면
exports.getKics = async function (req,res) {
    const[rowsBase, Bfields] = await pool.query(`
        SELECT * FROM kics_ratio
        WHERE SETL_YM = (SELECT SETL_YM FROM BASE_YM)
        AND EXE_IDNO = (SELECT EXE_IDNO FROM BASE_YM)
        `);
    const[rowsComp, Cfields] = await pool.query(`
        SELECT * FROM kics_ratio
        WHERE SETL_YM = (SELECT SETL_YM FROM COMP_YM)
        AND EXE_IDNO = (SELECT EXE_IDNO FROM COMP_YM)
    `);
    res.render('form.ejs', {
        contentBase: rowsBase, contentComp: rowsComp, addComma : func.commaFunc})
        // .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')});
};

// excel 데이터 DB 입력
exports.insertKics = async function (exFile) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);

        try{
             // 기준년월 설정
             readXlsxFile('KICS_DB.xlsx',{ sheet:1 }).then((rows) => {
                rows.shift()       
                let sql = 'INSERT INTO `Base_YM` VALUES ?'
                connection.query(sql,[rows],(error,response)=>{
                    console.log(error || response)       
                })
            })     
            // 비교년월 설정
            readXlsxFile('KICS_DB.xlsx',{ sheet:2 }).then((rows) => {
                rows.shift()       
                let sql = 'INSERT INTO `Comp_YM` VALUES ?'
                connection.query(sql,[rows],(error,response)=>{
                    console.log(error || response)       
                })
            })     

            // 장기손보 원수/수재보험 CF엔진 산출데이터 불러오기
            readXlsxFile('KICS_DB.xlsx',{ sheet:3 }).then((rows) => {
                rows.shift()       
                let sql = 'INSERT INTO `LTerm_CF_DT` VALUES ?'
                connection.query(sql,[rows],(error,response)=>{
                    console.log(error || response)       
                })
            })     
                
            // 장기손보 출재보험 CF엔진 산출데이터 불러오기
            readXlsxFile('KICS_DB.xlsx',{ sheet:4 }).then((rows) => {
                rows.shift()       
                let sql = 'INSERT INTO `LTerm_RECF_DT` VALUES ?'
                connection.query(sql,[rows],(error,response)=>{
                    console.log(error || response)       
                })
            }) 

            // 장기손보 대재해위험 기초자료 불러오기 : 대재해구분 코드별로 SUM SORT 되어있는 기초자료 가정        
            readXlsxFile('KICS_DB.xlsx',{ sheet:5 }).then((rows) => {
                rows.shift()       
                let sql = 'INSERT INTO `LTerm_CAT_DT` VALUES ?'
                connection.query(sql,[rows],(error,response)=>{
                    console.log(error || response)       
                })
            }) 

            // 장기손보 기타 입력자료 불러오기: 보험미결금액 등 
            readXlsxFile('KICS_DB.xlsx',{ sheet:6 }).then((rows) => {
                rows.shift()       
                let sql = 'INSERT INTO `LTerm_Oth_DT` VALUES ?'
                connection.query(sql,[rows],(error,response)=>{
                    console.log(error || response)       
                })
            }) 
            connection.release();
            
            // 일반손보 현행추정 기초데이터 
               readXlsxFile('KICS_DB.xlsx',{ sheet:7 }).then((rows) => {
                rows.shift()       
                let sql = 'INSERT INTO `STerm_CE_DT` VALUES ?'
                connection.query(sql,[rows],(error,response)=>{
                    console.log(error || response)       
                })
            }) 
            connection.release();

            // 일반손보 재보험자산 기초데이터
            readXlsxFile('KICS_DB.xlsx',{ sheet:8 }).then((rows) => {
                rows.shift()       
                let sql = 'INSERT INTO `STerm_RE_DT` VALUES ?'
                connection.query(sql,[rows],(error,response)=>{
                    console.log(error || response)       
                })
            }) 
            connection.release();

            // 일반손보 보유리스크율 산출 기초데이터
            readXlsxFile('KICS_DB.xlsx',{ sheet:9 }).then((rows) => {
                rows.shift()       
                let sql = 'INSERT INTO `STerm_RTNRISK_DT` VALUES ?'
                connection.query(sql,[rows],(error,response)=>{
                    console.log(error || response)       
                })
            }) 

            // 운영위험액 기초데이터
            readXlsxFile('KICS_DB.xlsx',{ sheet:10 }).then((rows) => {
                rows.shift()       
                let sql = 'INSERT INTO `OPERATION_DT` VALUES ?'
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