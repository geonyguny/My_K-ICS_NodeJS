// const LTCtrl = require("../controllers/kicsCtrl");
// const LTCtrl = require("../controllers/kicsCtrl");
const view = require("../index")
const deleteDao = require("../controllers/deleteDao");
const insertDao = require("../controllers/insertDao");
const queryDao = require("../controllers/queryDao");
// const uploadExcel = require("../uploadExcel")
const router = require("express").Router();

router.route('/')
    .get(insertDao.getKics)
    // .post(uploadExcel.uploadExcel)    
    .delete(deleteDao.deleteKics)    
    // .post(view.uploadExcel)  
    // .post(insertDao.insertKics)   
    // .post(queryDao.queryKics)
module.exports = router;

