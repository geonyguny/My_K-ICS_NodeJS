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


// connection.connect();

// module.exports = connection