const { pool } = require("../dbConfig");

exports.queryKics = async function () {
    try {
        const connection = await pool.getConnection(async (conn) => conn);

        try{
        // SQL - KICS RATIO :
        // KICS RATIO
        connection.query(
            `INSERT INTO KICS_RATIO 
            (SETL_YM, EXE_IDNO, PRINT_ORDER, PRINT_NAME, PRINT_VALUE)

            VALUES
            (
           (SELECT SETL_YM FROM BASE_YM)
                ,(SELECT EXE_IDNO FROM BASE_YM)  
                , 1
                ,"가. 지급여력금액 (Ⅳ + Ⅴ)"
                , (SELECT available_capital FROM available_capital
                WHERE SETL_YM = (SELECT SETL_YM FROM BASE_YM)
                AND EXE_IDNO = (SELECT EXE_IDNO FROM BASE_YM)
                )
                ),     
                
			((SELECT SETL_YM FROM BASE_YM)
                ,(SELECT EXE_IDNO FROM BASE_YM)  
                , 2
                ,"    Ⅰ. 건전성감독기준 재무상태표 상의 순자산"
                , (SELECT PAP_NAV FROM available_capital
                WHERE SETL_YM = (SELECT SETL_YM FROM BASE_YM)
                AND EXE_IDNO = (SELECT EXE_IDNO FROM BASE_YM)
                )
                ),                
                
			((SELECT SETL_YM FROM BASE_YM)
			,(SELECT EXE_IDNO FROM BASE_YM)  
			, 3
			,"    Ⅱ. 지급여력금액으로 불인정하는 항목"
			, (SELECT DISAPP_CAPITAL FROM available_capital
			WHERE SETL_YM = (SELECT SETL_YM FROM BASE_YM)
			AND EXE_IDNO = (SELECT EXE_IDNO FROM BASE_YM)
			)
			),
            
			((SELECT SETL_YM FROM BASE_YM)
			,(SELECT EXE_IDNO FROM BASE_YM)  
			, 4
			,"    Ⅲ. 보완자본으로 재뷴류하는 항목"
			, (SELECT RECL_T2_CAPITAL FROM available_capital
			WHERE SETL_YM = (SELECT SETL_YM FROM BASE_YM)
			AND EXE_IDNO = (SELECT EXE_IDNO FROM BASE_YM)
			)
			),
            
            ((SELECT SETL_YM FROM BASE_YM)
			,(SELECT EXE_IDNO FROM BASE_YM)  
			, 5
			,"    Ⅳ. 기본자본"
			, (SELECT T1_CAPITAL FROM available_capital
			WHERE SETL_YM = (SELECT SETL_YM FROM BASE_YM)
			AND EXE_IDNO = (SELECT EXE_IDNO FROM BASE_YM)
			)
			),
            
            ((SELECT SETL_YM FROM BASE_YM)
			,(SELECT EXE_IDNO FROM BASE_YM)  
			, 6
			,"    Ⅴ. 보완자본"
			, (SELECT T2_CAPITAL FROM available_capital
			WHERE SETL_YM = (SELECT SETL_YM FROM BASE_YM)
			AND EXE_IDNO = (SELECT EXE_IDNO FROM BASE_YM)
			)
			),
            
            ((SELECT SETL_YM FROM BASE_YM)
			,(SELECT EXE_IDNO FROM BASE_YM)  
			, 7
			,"나. 지급여력기준금액 (Ⅰ-Ⅱ+Ⅲ)"
			, (SELECT REQUIRED_CAPTIAL FROM required_capital
			WHERE SETL_YM = (SELECT SETL_YM FROM BASE_YM)
			AND EXE_IDNO = (SELECT EXE_IDNO FROM BASE_YM)
			)
			),
            
             ((SELECT SETL_YM FROM BASE_YM)
			,(SELECT EXE_IDNO FROM BASE_YM)  
			, 8
			,"    Ⅰ. 기본요구자본"
			, (SELECT BASE_REQ_CAPITAL FROM required_capital
			WHERE SETL_YM = (SELECT SETL_YM FROM BASE_YM)
			AND EXE_IDNO = (SELECT EXE_IDNO FROM BASE_YM)
			)
			),
            
             ((SELECT SETL_YM FROM BASE_YM)
			,(SELECT EXE_IDNO FROM BASE_YM)  
			, 9
			,"         - 분산효과 : (1+2+3+4+5) - Ⅰ"
			, (SELECT EFCT_DIST FROM required_capital
			WHERE SETL_YM = (SELECT SETL_YM FROM BASE_YM)
			AND EXE_IDNO = (SELECT EXE_IDNO FROM BASE_YM)
			)
			),
            
			((SELECT SETL_YM FROM BASE_YM)
			,(SELECT EXE_IDNO FROM BASE_YM)  
			, 10
			,"       1. 장기손해보험위험액"
			, (SELECT LT_RISK_FINAL FROM required_capital
			WHERE SETL_YM = (SELECT SETL_YM FROM BASE_YM)
			AND EXE_IDNO = (SELECT EXE_IDNO FROM BASE_YM)
			)
			),
            
            ((SELECT SETL_YM FROM BASE_YM)
			,(SELECT EXE_IDNO FROM BASE_YM)  
			, 11
			,"       2. 일반손해보험위험액"
			, (SELECT ST_RISK_FINAL FROM required_capital
			WHERE SETL_YM = (SELECT SETL_YM FROM BASE_YM)
			AND EXE_IDNO = (SELECT EXE_IDNO FROM BASE_YM)
			)
			),
            
			 ((SELECT SETL_YM FROM BASE_YM)
			,(SELECT EXE_IDNO FROM BASE_YM)  
			, 12
			,"       3. 시장위험액"
			, (SELECT MARKET_RISK FROM required_capital
			WHERE SETL_YM = (SELECT SETL_YM FROM BASE_YM)
			AND EXE_IDNO = (SELECT EXE_IDNO FROM BASE_YM)
			)
			),
            
			 ((SELECT SETL_YM FROM BASE_YM)
			,(SELECT EXE_IDNO FROM BASE_YM)  
			, 13
			,"       4. 신용위험액"
			, (SELECT CREDIT_RISK FROM required_capital
			WHERE SETL_YM = (SELECT SETL_YM FROM BASE_YM)
			AND EXE_IDNO = (SELECT EXE_IDNO FROM BASE_YM)
			)
			),
            
            ((SELECT SETL_YM FROM BASE_YM)
			,(SELECT EXE_IDNO FROM BASE_YM)  
			, 14
			,"       5. 운영위험액"
			, (SELECT OPERATION_RISK FROM required_capital
			WHERE SETL_YM = (SELECT SETL_YM FROM BASE_YM)
			AND EXE_IDNO = (SELECT EXE_IDNO FROM BASE_YM)
			)
			),
            
            ((SELECT SETL_YM FROM BASE_YM)
			,(SELECT EXE_IDNO FROM BASE_YM)  
			, 15
			,"    Ⅱ. 법인세조정액"
			, (SELECT ADJ_COP_TAX FROM required_capital
			WHERE SETL_YM = (SELECT SETL_YM FROM BASE_YM)
			AND EXE_IDNO = (SELECT EXE_IDNO FROM BASE_YM)
			)
			),
            
			((SELECT SETL_YM FROM BASE_YM)
			,(SELECT EXE_IDNO FROM BASE_YM)  
			, 16
			,"    Ⅲ. 기타요구자본"
			, (SELECT OTH_REQ_CAPITAL FROM required_capital
			WHERE SETL_YM = (SELECT SETL_YM FROM BASE_YM)
			AND EXE_IDNO = (SELECT EXE_IDNO FROM BASE_YM)
			)
			),
            
			((SELECT SETL_YM FROM BASE_YM)
			,(SELECT EXE_IDNO FROM BASE_YM)  
			, 17
			,"다. 지급여력비율 : 가 ÷ 나 × 100"
			, (SELECT B.available_capital/A.REQUIRED_CAPTIAL *100
            FROM required_capital A,
            available_capital B
			WHERE A.SETL_YM = (SELECT SETL_YM FROM BASE_YM)
			AND A.EXE_IDNO = (SELECT EXE_IDNO FROM BASE_YM)
            AND A.SETL_YM = B.SETL_YM
            AND A.EXE_IDNO = B.EXE_IDNO
			)
			),
            
                        (
           (SELECT SETL_YM FROM COMP_YM)
                ,(SELECT EXE_IDNO FROM COMP_YM)  
                , 1
                ,"가. 지급여력금액 (Ⅳ + Ⅴ)"
                , (SELECT available_capital FROM available_capital
                WHERE SETL_YM = (SELECT SETL_YM FROM COMP_YM)
                AND EXE_IDNO = (SELECT EXE_IDNO FROM COMP_YM)
                )
                ),     
                
			((SELECT SETL_YM FROM COMP_YM)
                ,(SELECT EXE_IDNO FROM COMP_YM)  
                , 2
                ,"    Ⅰ. 건전성감독기준 재무상태표 상의 순자산"
                , (SELECT PAP_NAV FROM available_capital
                WHERE SETL_YM = (SELECT SETL_YM FROM COMP_YM)
                AND EXE_IDNO = (SELECT EXE_IDNO FROM COMP_YM)
                )
                ),                
                
			((SELECT SETL_YM FROM COMP_YM)
			,(SELECT EXE_IDNO FROM COMP_YM)  
			, 3
			,"    Ⅱ. 지급여력금액으로 불인정하는 항목"
			, (SELECT DISAPP_CAPITAL FROM available_capital
			WHERE SETL_YM = (SELECT SETL_YM FROM COMP_YM)
			AND EXE_IDNO = (SELECT EXE_IDNO FROM COMP_YM)
			)
			),
            
			((SELECT SETL_YM FROM COMP_YM)
			,(SELECT EXE_IDNO FROM COMP_YM)  
			, 4
			,"    Ⅲ. 보완자본으로 재뷴류하는 항목"
			, (SELECT RECL_T2_CAPITAL FROM available_capital
			WHERE SETL_YM = (SELECT SETL_YM FROM COMP_YM)
			AND EXE_IDNO = (SELECT EXE_IDNO FROM COMP_YM)
			)
			),
            
            ((SELECT SETL_YM FROM COMP_YM)
			,(SELECT EXE_IDNO FROM COMP_YM)  
			, 5
			,"    Ⅳ. 기본자본"
			, (SELECT T1_CAPITAL FROM available_capital
			WHERE SETL_YM = (SELECT SETL_YM FROM COMP_YM)
			AND EXE_IDNO = (SELECT EXE_IDNO FROM COMP_YM)
			)
			),
            
            ((SELECT SETL_YM FROM COMP_YM)
			,(SELECT EXE_IDNO FROM COMP_YM)  
			, 6
			,"    Ⅴ. 보완자본"
			, (SELECT T2_CAPITAL FROM available_capital
			WHERE SETL_YM = (SELECT SETL_YM FROM COMP_YM)
			AND EXE_IDNO = (SELECT EXE_IDNO FROM COMP_YM)
			)
			),
            
            ((SELECT SETL_YM FROM COMP_YM)
			,(SELECT EXE_IDNO FROM COMP_YM)  
			, 7
			,"나. 지급여력기준금액 (Ⅰ-Ⅱ+Ⅲ)"
			, (SELECT REQUIRED_CAPTIAL FROM required_capital
			WHERE SETL_YM = (SELECT SETL_YM FROM COMP_YM)
			AND EXE_IDNO = (SELECT EXE_IDNO FROM COMP_YM)
			)
			),
            
             ((SELECT SETL_YM FROM COMP_YM)
			,(SELECT EXE_IDNO FROM COMP_YM)  
			, 8
			,"    Ⅰ. 기본요구자본"
			, (SELECT BASE_REQ_CAPITAL FROM required_capital
			WHERE SETL_YM = (SELECT SETL_YM FROM COMP_YM)
			AND EXE_IDNO = (SELECT EXE_IDNO FROM COMP_YM)
			)
			),
            
             ((SELECT SETL_YM FROM COMP_YM)
			,(SELECT EXE_IDNO FROM COMP_YM)  
			, 9
			,"         - 분산효과 : (1+2+3+4+5) - Ⅰ"
			, (SELECT EFCT_DIST FROM required_capital
			WHERE SETL_YM = (SELECT SETL_YM FROM COMP_YM)
			AND EXE_IDNO = (SELECT EXE_IDNO FROM COMP_YM)
			)
			),
            
			((SELECT SETL_YM FROM COMP_YM)
			,(SELECT EXE_IDNO FROM COMP_YM)  
			, 10
			,"       1. 장기손해보험위험액"
			, (SELECT LT_RISK_FINAL FROM required_capital
			WHERE SETL_YM = (SELECT SETL_YM FROM COMP_YM)
			AND EXE_IDNO = (SELECT EXE_IDNO FROM COMP_YM)
			)
			),
            
            ((SELECT SETL_YM FROM COMP_YM)
			,(SELECT EXE_IDNO FROM COMP_YM)  
			, 11
			,"       2. 일반손해보험위험액"
			, (SELECT ST_RISK_FINAL FROM required_capital
			WHERE SETL_YM = (SELECT SETL_YM FROM COMP_YM)
			AND EXE_IDNO = (SELECT EXE_IDNO FROM COMP_YM)
			)
			),
            
			 ((SELECT SETL_YM FROM COMP_YM)
			,(SELECT EXE_IDNO FROM COMP_YM)  
			, 12
			,"       3. 시장위험액"
			, (SELECT MARKET_RISK FROM required_capital
			WHERE SETL_YM = (SELECT SETL_YM FROM COMP_YM)
			AND EXE_IDNO = (SELECT EXE_IDNO FROM COMP_YM)
			)
			),
            
			 ((SELECT SETL_YM FROM COMP_YM)
			,(SELECT EXE_IDNO FROM COMP_YM)  
			, 13
			,"       4. 신용위험액"
			, (SELECT CREDIT_RISK FROM required_capital
			WHERE SETL_YM = (SELECT SETL_YM FROM COMP_YM)
			AND EXE_IDNO = (SELECT EXE_IDNO FROM COMP_YM)
			)
			),
            
            ((SELECT SETL_YM FROM COMP_YM)
			,(SELECT EXE_IDNO FROM COMP_YM)  
			, 14
			,"       5. 운영위험액"
			, (SELECT OPERATION_RISK FROM required_capital
			WHERE SETL_YM = (SELECT SETL_YM FROM COMP_YM)
			AND EXE_IDNO = (SELECT EXE_IDNO FROM COMP_YM)
			)
			),
            
            ((SELECT SETL_YM FROM COMP_YM)
			,(SELECT EXE_IDNO FROM COMP_YM)  
			, 15
			,"    Ⅱ. 법인세조정액"
			, (SELECT ADJ_COP_TAX FROM required_capital
			WHERE SETL_YM = (SELECT SETL_YM FROM COMP_YM)
			AND EXE_IDNO = (SELECT EXE_IDNO FROM COMP_YM)
			)
			),
            
			((SELECT SETL_YM FROM COMP_YM)
			,(SELECT EXE_IDNO FROM COMP_YM)  
			, 16
			,"    Ⅲ. 기타요구자본"
			, (SELECT OTH_REQ_CAPITAL FROM required_capital
			WHERE SETL_YM = (SELECT SETL_YM FROM COMP_YM)
			AND EXE_IDNO = (SELECT EXE_IDNO FROM COMP_YM)
			)
			),
            
			((SELECT SETL_YM FROM COMP_YM)
			,(SELECT EXE_IDNO FROM COMP_YM)  
			, 17
			,"다. 지급여력비율 : 가 ÷ 나 × 100"
			, (SELECT B.available_capital/A.REQUIRED_CAPTIAL *100
            FROM required_capital A,
            available_capital B
			WHERE A.SETL_YM = (SELECT SETL_YM FROM COMP_YM)
			AND A.EXE_IDNO = (SELECT EXE_IDNO FROM COMP_YM)
            AND A.SETL_YM = B.SETL_YM
            AND A.EXE_IDNO = B.EXE_IDNO
			)
			)
            ;
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