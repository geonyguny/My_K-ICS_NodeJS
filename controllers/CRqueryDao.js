const { pool } = require("../dbConfig");

exports.queryKics = async function () {
    try {
        const connection = await pool.getConnection(async (conn) => conn);

        try{
        // SQL - 신용위험액 :
        // OPERATION_RISK
        connection.query(
            `INSERT INTO credit_risk 
            (SETL_YM, EXE_IDNO, credit_risk)

            VALUES
            (
           (SELECT SETL_YM FROM BASE_YM)
                ,(SELECT EXE_IDNO FROM BASE_YM)  
                , (select A.CRD1_RISK-B.CRD2_RISK
                FROM
                (SELECT SUM(CREDIT_EXPO*AVG_CRD_RSK_COEF) AS CRD1_RISK
                FROM CREDIT_DT
                WHERE SETL_YM = (SELECT SETL_YM FROM BASE_YM)
                AND EXE_IDNO = (SELECT EXE_IDNO FROM BASE_YM)
                AND RSK_RDU_DVCD = 1
                ) AS A,
                (SELECT SUM(CREDIT_EXPO*AVG_CRD_RSK_COEF) AS CRD2_RISK
                FROM CREDIT_DT
                WHERE SETL_YM = (SELECT SETL_YM FROM BASE_YM)
                AND EXE_IDNO = (SELECT EXE_IDNO FROM BASE_YM)
                AND RSK_RDU_DVCD = 2
                ) AS B
                )
                ),
                
				(				
                (SELECT SETL_YM FROM COMP_YM)
                ,(SELECT EXE_IDNO FROM COMP_YM)  
                , (select A.CRD1_RISK-B.CRD2_RISK
                FROM
                (SELECT SUM(CREDIT_EXPO*AVG_CRD_RSK_COEF) AS CRD1_RISK
                FROM CREDIT_DT
                WHERE SETL_YM = (SELECT SETL_YM FROM comp_ym)
                AND EXE_IDNO = (SELECT EXE_IDNO FROM comp_ym)
                AND RSK_RDU_DVCD = 1
                ) AS A,
                (SELECT SUM(CREDIT_EXPO*AVG_CRD_RSK_COEF) AS CRD2_RISK
                FROM CREDIT_DT
                WHERE SETL_YM = (SELECT SETL_YM FROM comp_ym)
                AND EXE_IDNO = (SELECT EXE_IDNO FROM comp_ym)
                AND RSK_RDU_DVCD = 2
                ) AS B
                )
                );
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