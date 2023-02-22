// const LTCtrl = require("../controllers/kicsCtrl");
// const LTCtrl = require("../controllers/kicsCtrl");
// const view = require("../index")
const deleteDao = require("../controllers/deleteDao");
const insertDao = require("../controllers/insertDao");
const queryDao = require("../controllers/STqueryDao");
// const uploadExcel = require("../controllers/uploadExcel")
const router = require("express").Router();

router.route('/')
    .get(insertDao.getKics)
    .delete(deleteDao.deleteKics)    
    .post(insertDao.insertKics)   
    // .post(queryDao.queryKics)
module.exports = router;

