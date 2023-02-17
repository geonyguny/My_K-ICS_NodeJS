const { pool } = require("../dbConfig");
const ejs = require('ejs')
const express = require('express')
const app = express()
app.set('ejs',ejs.renderFile)

exports.getKics = async function (req,res) {
    const[rows, fields] = await pool.query('SELECT * FROM LTerm_Summary');
    res.render('form.ejs', {content: rows})
};