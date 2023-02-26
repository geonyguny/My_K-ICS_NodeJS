const { pool } = require("../dbConfig");

exports.queryKics = async function () {
    try {
        const connection = await pool.getConnection(async (conn) => conn);

        try{
        // SQL - 운영위험액 :
        // OPERATION_RISK
        connection.query(
            `INSERT INTO OPERATION_RISK 
            (SETL_YM, EXE_IDNO, OPERATION_RISK)

            VALUES(
                (SELECT SETL_YM FROM BASE_YM)
                ,(SELECT EXE_IDNO FROM BASE_YM)  
                , (SELECT SUM(OPER_RISK_COEF*OPER_RISK_EXPO_AMT) AS OPERATION_RISK
                   FROM OPERATION_DT
                WHERE SETL_YM = (SELECT SETL_YM FROM BASE_YM)
                AND EXE_IDNO = (SELECT EXE_IDNO FROM BASE_YM))
            `                                
        );
               
        } catch (err) {
            console.error(" ##### Insert From DB Query Error ##### ");
            return false;
        }
    }catch (err) {
        console.error("##### DB Access Error #####");
        return false;
    }
}