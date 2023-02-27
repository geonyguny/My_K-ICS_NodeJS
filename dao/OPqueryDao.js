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

            VALUES
            (
           (SELECT SETL_YM FROM BASE_YM)
                ,(SELECT EXE_IDNO FROM BASE_YM)  
                , (select 
                    C.OPER_RSIK+D.OPER_RSIK+E.OPER_RSIK
                FROM(
                (select A.OPER_PROD_CD, greatest(A.SUM123, B.SUM4) AS OPER_RSIK
                FROM
                (SELECT OPER_PROD_CD, IFNULL(SUM(OPER_RISK_COEF*OPER_RISK_EXPO_AMT),0) AS SUM123
                FROM OPERATION_DT
                WHERE SETL_YM = (SELECT SETL_YM FROM BASE_YM)
                AND EXE_IDNO = (SELECT EXE_IDNO FROM BASE_YM)
                AND OPER_EXPO_CD IN (1,2,3)
                AND OPER_PROD_CD = 1
                ) AS A,
                (SELECT OPER_PROD_CD,  IFNULL(SUM(OPER_RISK_COEF*OPER_RISK_EXPO_AMT),0) AS SUM4
                FROM OPERATION_DT
                WHERE SETL_YM = (SELECT SETL_YM FROM BASE_YM)
                AND EXE_IDNO = (SELECT EXE_IDNO FROM BASE_YM)
                AND OPER_EXPO_CD IN (4)
                AND OPER_PROD_CD = 1
                ) as B
                ) AS C,
                
                (select A.OPER_PROD_CD, greatest(A.SUM123, B.SUM4) AS OPER_RSIK
                FROM
                (SELECT OPER_PROD_CD, IFNULL(SUM(OPER_RISK_COEF*OPER_RISK_EXPO_AMT),0) AS SUM123
                FROM OPERATION_DT
                WHERE SETL_YM = (SELECT SETL_YM FROM BASE_YM)
                AND EXE_IDNO = (SELECT EXE_IDNO FROM BASE_YM)
                AND OPER_EXPO_CD IN (1,2,3)
                AND OPER_PROD_CD = 2
                ) AS A,
                (SELECT OPER_PROD_CD,  IFNULL(SUM(OPER_RISK_COEF*OPER_RISK_EXPO_AMT),0) AS SUM4
                FROM OPERATION_DT
                WHERE SETL_YM = (SELECT SETL_YM FROM BASE_YM)
                AND EXE_IDNO = (SELECT EXE_IDNO FROM BASE_YM)
                AND OPER_EXPO_CD IN (4)
                AND OPER_PROD_CD = 2
                ) as B
                ) AS D,
                
                (select A.OPER_PROD_CD, greatest(A.SUM123, B.SUM4) AS OPER_RSIK
                FROM
                (SELECT OPER_PROD_CD, IFNULL(SUM(OPER_RISK_COEF*OPER_RISK_EXPO_AMT),0) AS SUM123
                FROM OPERATION_DT
                WHERE SETL_YM = (SELECT SETL_YM FROM BASE_YM)
                AND EXE_IDNO = (SELECT EXE_IDNO FROM BASE_YM)
                AND OPER_EXPO_CD IN (1,2,3)
                AND OPER_PROD_CD = 3
                ) AS A,
                (SELECT OPER_PROD_CD,  IFNULL(SUM(OPER_RISK_COEF*OPER_RISK_EXPO_AMT),0) AS SUM4
                FROM OPERATION_DT
                WHERE SETL_YM = (SELECT SETL_YM FROM BASE_YM)
                AND EXE_IDNO = (SELECT EXE_IDNO FROM BASE_YM)
                AND OPER_EXPO_CD IN (4)
                AND OPER_PROD_CD = 3
                ) as B
                ) AS E
                )
                )
                ),
                
				(				
                (SELECT SETL_YM FROM COMP_YM)
                ,(SELECT EXE_IDNO FROM COMP_YM)  
                , (select 
                    C.OPER_RSIK+D.OPER_RSIK+E.OPER_RSIK
                FROM(
                (select A.OPER_PROD_CD, greatest(A.SUM123, B.SUM4) AS OPER_RSIK
                FROM
                (SELECT OPER_PROD_CD, IFNULL(SUM(OPER_RISK_COEF*OPER_RISK_EXPO_AMT),0) AS SUM123
                FROM OPERATION_DT
                WHERE SETL_YM = (SELECT SETL_YM FROM COMP_YM)
                AND EXE_IDNO = (SELECT EXE_IDNO FROM COMP_YM)
                AND OPER_EXPO_CD IN (1,2,3)
                AND OPER_PROD_CD = 1
                ) AS A,
                (SELECT OPER_PROD_CD,  IFNULL(SUM(OPER_RISK_COEF*OPER_RISK_EXPO_AMT),0) AS SUM4
                FROM OPERATION_DT
                WHERE SETL_YM = (SELECT SETL_YM FROM COMP_YM)
                AND EXE_IDNO = (SELECT EXE_IDNO FROM COMP_YM)
                AND OPER_EXPO_CD IN (4)
                AND OPER_PROD_CD = 1
                ) as B
                ) AS C,
                
                (select A.OPER_PROD_CD, greatest(A.SUM123, B.SUM4) AS OPER_RSIK
                FROM
                (SELECT OPER_PROD_CD, IFNULL(SUM(OPER_RISK_COEF*OPER_RISK_EXPO_AMT),0) AS SUM123
                FROM OPERATION_DT
                WHERE SETL_YM = (SELECT SETL_YM FROM COMP_YM)
                AND EXE_IDNO = (SELECT EXE_IDNO FROM COMP_YM)
                AND OPER_EXPO_CD IN (1,2,3)
                AND OPER_PROD_CD = 2
                ) AS A,
                (SELECT OPER_PROD_CD,  IFNULL(SUM(OPER_RISK_COEF*OPER_RISK_EXPO_AMT),0) AS SUM4
                FROM OPERATION_DT
                WHERE SETL_YM = (SELECT SETL_YM FROM COMP_YM)
                AND EXE_IDNO = (SELECT EXE_IDNO FROM COMP_YM)
                AND OPER_EXPO_CD IN (4)
                AND OPER_PROD_CD = 2
                ) as B
                ) AS D,
                
                (select A.OPER_PROD_CD, greatest(A.SUM123, B.SUM4) AS OPER_RSIK
                FROM
                (SELECT OPER_PROD_CD, IFNULL(SUM(OPER_RISK_COEF*OPER_RISK_EXPO_AMT),0) AS SUM123
                FROM OPERATION_DT
                WHERE SETL_YM = (SELECT SETL_YM FROM COMP_YM)
                AND EXE_IDNO = (SELECT EXE_IDNO FROM COMP_YM)
                AND OPER_EXPO_CD IN (1,2,3)
                AND OPER_PROD_CD = 3
                ) AS A,
                (SELECT OPER_PROD_CD,  IFNULL(SUM(OPER_RISK_COEF*OPER_RISK_EXPO_AMT),0) AS SUM4
                FROM OPERATION_DT
                WHERE SETL_YM = (SELECT SETL_YM FROM COMP_YM)
                AND EXE_IDNO = (SELECT EXE_IDNO FROM COMP_YM)
                AND OPER_EXPO_CD IN (4)
                AND OPER_PROD_CD = 3
                ) as B
                ) AS E
                )
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