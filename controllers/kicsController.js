const { pool } = require("../dbConfig");
const ejs = require('ejs')
const express = require('express')
const app = express()
app.set('view engine', 'ejs')
app.set('views',__dirname+'views')
app.set('ejs',ejs.renderFile)
const deleteDao = require("./deleteDao");
const insertDao = require("./controllers/insertDao");
const queryDao = require("./controllers/queryDao");


app.delete('/delete', (req,res) =>{
    deleteDao.deleteKics()
});

app.get('/',)
exports.getKics = async function (req,res) {
    const[rows, fields] = await pool.query('SELECT * FROM LTerm_Summary');
    res.render('form.ejs', {content: rows})
};