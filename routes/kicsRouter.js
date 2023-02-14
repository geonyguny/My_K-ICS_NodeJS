// const LTCtrl = require("../controllers/kicsCtrl");
const LTCtrl = require("../controllers/kicsCtrl");
const router = require("express").Router();


router.route('/function')
    .get(LTCtrl.getKics)
    .post(LTCtrl.insertKics)
    .post(LTCtrl.queryKics)    
    .delete(LTCtrl.deleteKics)    
    // .post(LTCtrl.queryCatKics)
    // .post(LTCtrl.queryFVKics)
    // .post(LTCtrl.queryRiskKics)
    // .post(LTCtrl.queryRiskSumKics)
module.exports = router;

