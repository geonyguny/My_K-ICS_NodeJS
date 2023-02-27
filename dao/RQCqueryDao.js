const { pool } = require("../dbConfig");

exports.queryKics = async function () {
    try {
        const connection = await pool.getConnection(async (conn) => conn);

        try{
        // SQL - 요구자본 :
        // REQUIRED CAPITAL
        connection.query(
            `INSERT INTO required_capital 
            (SETL_YM, EXE_IDNO, BASE_REQ_CAPITAL, EFCT_DIST
            , LT_RISK_FINAL, ST_RISK_FINAL, MARKET_RISK, CREDIT_RISK, OPERATION_RISK
            ,ADJ_COP_TAX, OTH_REQ_CAPITAL, REQUIRED_CAPTIAL
            )

            VALUES
            (
			(SELECT SETL_YM FROM BASE_YM)
			,(SELECT EXE_IDNO FROM BASE_YM)  
			, 20661.000
            , 7350.000
            , (SELECT LT_RISK_FINAL FROM LTerm_SUMMARY
			WHERE SETL_YM = (SELECT SETL_YM FROM BASE_YM)
			AND EXE_IDNO = (SELECT EXE_IDNO FROM BASE_YM)
            )
            , (SELECT ST_RISK_FINAL FROM STerm_SUMMARY
			WHERE SETL_YM = (SELECT SETL_YM FROM BASE_YM)
			AND EXE_IDNO = (SELECT EXE_IDNO FROM BASE_YM)
            )
            , (SELECT MARKET_RISK FROM MARKET_RISK
			WHERE SETL_YM = (SELECT SETL_YM FROM BASE_YM)
			AND EXE_IDNO = (SELECT EXE_IDNO FROM BASE_YM)
            )
			, (SELECT CREDIT_RISK FROM CREDIT_RISK
			WHERE SETL_YM = (SELECT SETL_YM FROM BASE_YM)
			AND EXE_IDNO = (SELECT EXE_IDNO FROM BASE_YM)
            )
			, (SELECT OPERATION_RISK FROM OPERATION_RISK
			WHERE SETL_YM = (SELECT SETL_YM FROM BASE_YM)
			AND EXE_IDNO = (SELECT EXE_IDNO FROM BASE_YM)
            )
            , (SELECT SUGI24 FROM SUGI_DT
			WHERE SETL_YM = (SELECT SETL_YM FROM BASE_YM)
			AND EXE_IDNO = (SELECT EXE_IDNO FROM BASE_YM)
            )
			, (SELECT SUGI25 FROM SUGI_DT
			WHERE SETL_YM = (SELECT SETL_YM FROM BASE_YM)
			AND EXE_IDNO = (SELECT EXE_IDNO FROM BASE_YM)
            )
            ,14201
			),
            
            (
			(SELECT SETL_YM FROM COMP_YM)
			,(SELECT EXE_IDNO FROM COMP_YM)  
			, 21204
            , 7712
            , (SELECT LT_RISK_FINAL FROM LTerm_SUMMARY
			WHERE SETL_YM = (SELECT SETL_YM FROM COMP_YM)
			AND EXE_IDNO = (SELECT EXE_IDNO FROM COMP_YM)
            )
            , (SELECT ST_RISK_FINAL FROM STerm_SUMMARY
			WHERE SETL_YM = (SELECT SETL_YM FROM COMP_YM)
			AND EXE_IDNO = (SELECT EXE_IDNO FROM COMP_YM)
            )
            , (SELECT MARKET_RISK FROM MARKET_RISK
			WHERE SETL_YM = (SELECT SETL_YM FROM COMP_YM)
			AND EXE_IDNO = (SELECT EXE_IDNO FROM COMP_YM)
            )
			, (SELECT CREDIT_RISK FROM CREDIT_RISK
			WHERE SETL_YM = (SELECT SETL_YM FROM COMP_YM)
			AND EXE_IDNO = (SELECT EXE_IDNO FROM COMP_YM)
            )
			, (SELECT OPERATION_RISK FROM OPERATION_RISK
			WHERE SETL_YM = (SELECT SETL_YM FROM COMP_YM)
			AND EXE_IDNO = (SELECT EXE_IDNO FROM COMP_YM)
            )
            , (SELECT SUGI24 FROM SUGI_DT
			WHERE SETL_YM = (SELECT SETL_YM FROM COMP_YM)
			AND EXE_IDNO = (SELECT EXE_IDNO FROM COMP_YM)
            )
			, (SELECT SUGI25 FROM SUGI_DT
			WHERE SETL_YM = (SELECT SETL_YM FROM COMP_YM)
			AND EXE_IDNO = (SELECT EXE_IDNO FROM COMP_YM)
            )
            ,15535
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