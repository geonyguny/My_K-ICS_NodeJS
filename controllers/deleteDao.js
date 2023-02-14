const { pool } = require("../dbConfig");

exports.deleteKics = async function () {
    try {
        const connection = await pool.getConnection(async (conn) => conn);

        try{
        //SQL - LTerm_CF_DT 데이터 삭제
        connection.query(
            `DELETE FROM LTerm_CF_DT
            WHERE SETL_YM = 202212
            AND EXE_IDNO = 1`
        ); 
        
        //SQL - LTerm_CF_CAT 데이터 삭제
        connection.query(
            `DELETE FROM LTerm_CAT_DT
            WHERE SETL_YM = 202212
            AND EXE_IDNO = 1`
        ); 

        //SQL - LTerm_FV 데이터 삭제
        connection.query(
            `DELETE FROM LTerm_FV
            WHERE SETL_YM = 202212
            AND EXE_IDNO = 1`
        ); 

        //SQL - LTerm_OTH_DT 데이터 삭제
        connection.query(
            `DELETE FROM LTerm_OTH_DT
            WHERE SETL_YM = 202212
            AND EXE_IDNO = 1`
        ); 

        //SQL - LTerm_RECF_DT 데이터 삭제
        connection.query(
            `DELETE FROM LTerm_RECF_DT
            WHERE SETL_YM = 202212
            AND EXE_IDNO = 1`
        ); 

        //SQL - LTerm_RISK_CAT 데이터 삭제
        connection.query(
            `DELETE FROM LTerm_RISK_CAT
            WHERE SETL_YM = 202212
            AND EXE_IDNO = 1`
        ); 

        //SQL - LTerm_RISK_SHOCK 데이터 삭제
        connection.query(
            `DELETE FROM LTerm_RISK_SHOCK
            WHERE SETL_YM = 202212
            AND EXE_IDNO = 1`
        ); 

        //SQL - LTerm_RISK_SUM 데이터 삭제
        connection.query(
            `DELETE FROM LTerm_RISK_SUM
            WHERE SETL_YM = 202212
            AND EXE_IDNO = 1`
        ); 

        //SQL - LTerm_SUMMARY 데이터 삭제
        connection.query(
            `DELETE FROM LTerm_SUMMARY
            WHERE SETL_YM = 202212
            AND EXE_IDNO = 1`
        ); 
        } catch (err) {
            console.error(" ##### DELETE From DB Query Error ##### ");
            return false;
        }
    }catch (err) {
        console.error("##### DB Access Error #####");
        return false;
    }
}