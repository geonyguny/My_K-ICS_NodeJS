const { pool } = require("../dbConfig");
const ejs = require('ejs')
const express = require('express')
const app = express()
app.set('view engine', 'ejs')
app.set('views',__dirname+'views')
app.set('ejs',ejs.renderFile)


exports.getKics = async function (req,res) {
    const[rows, fields] = await pool.query('SELECT * FROM LTerm_Summary');
    res.render('form2.ejs', {content: rows})
};