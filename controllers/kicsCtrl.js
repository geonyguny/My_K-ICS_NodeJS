const fs = require('fs');
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host : conf.host,
    user : conf.user,
    password : conf.password,
    port : conf.port,
    database : conf.database
});
const readXlsxFile = require('read-excel-file/node')

//control get / insert
exports.getKics = async function () {
    try {
        const connection = await pool.getConnection(async (conn) => conn);

        try {
            const selectQuery = "SELECT * FROM LTerm_Summary;";
            const [row] = await connection.query(selectQuery);
            connection.release();
            console.log(row);
            return row;
        } catch (err) {
            console.error(` ##### getUserRows Query error ##### `);
            connection.release();
            return false;
        }
    } catch (err) {
        console.error(` ##### getUserRows DB error #####`);
        return false;
    }
};


