// const LTCtrl = require("../controllers/kicsCtrl");
const LTCtrl = require("../controllers/kicsCtrl");
const deleteDao = require("../controllers/deleteDao");
const insertDao = require("../controllers/insertDao");
const queryDao = require("../controllers/queryDao");
const router = require("express").Router();


router.route('/function')
    .get(LTCtrl.getKics)
    .post(insertDao.insertKics)    
    .delete(deleteDao.deleteKics)    
    .post(queryDao.queryKics)
    // .post(LTCtrl.queryFVKics)
    // .post(LTCtrl.queryRiskKics)
    // .post(LTCtrl.queryRiskSumKics)
module.exports = router;

