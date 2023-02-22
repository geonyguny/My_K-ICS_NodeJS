const { pool } = require("../dbConfig");

exports.deleteKics = async function () {
    try {
        const connection = await pool.getConnection(async (conn) => conn);

        try{
        //SQL - Base_YM 데이터 삭제
        connection.query(
        `DELETE FROM Base_YM`
        ); 

        //SQL - Comp_YM 데이터 삭제
        connection.query(
            `DELETE FROM Comp_YM`
        );  

        //SQL - LTerm_CF_DT 데이터 삭제
        connection.query(
            `DELETE FROM LTerm_CF_DT`
        );    

        //SQL - LTerm_CF_CAT 데이터 삭제
        connection.query(
            `DELETE FROM LTerm_CAT_DT`
        ); 

        //SQL - LTerm_FV 데이터 삭제
        connection.query(
            `DELETE FROM LTerm_FV`
        ); 

        //SQL - LTerm_OTH_DT 데이터 삭제
        connection.query(
            `DELETE FROM LTerm_OTH_DT`
        ); 

        //SQL - LTerm_RECF_DT 데이터 삭제
        connection.query(
            `DELETE FROM LTerm_RECF_DT`
        ); 

        //SQL - LTerm_RISK_CAT 데이터 삭제
        connection.query(
            `DELETE FROM LTerm_RISK_CAT`
        ); 

        //SQL - LTerm_RISK_SHOCK 데이터 삭제
        connection.query(
            `DELETE FROM LTerm_RISK_SHOCK`
        ); 

        //SQL - LTerm_RISK_SUM 데이터 삭제
        connection.query(
            `DELETE FROM LTerm_RISK_SUM`
        ); 

        //SQL - LTerm_SUMMARY 데이터 삭제
        connection.query(
            `DELETE FROM LTerm_SUMMARY`
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