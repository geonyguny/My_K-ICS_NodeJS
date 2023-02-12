const kicsCtrl = require("../controllers/kicsCtrl");
const router = require("express").Router();


router.route('/function')
    .get(kicsCtrl.getKics)
    .post(kicsCtrl.insertKics)
    .post(kicsCtrl.queryKics)
module.exports = router;

