const router = require("express").Router();

const { getAllAds ,adsRegister,adsDelete} = require("../controllers/adsController");

router.get("/", getAllAds);
router.post('/',adsRegister);
router.delete("/",adsDelete);

module.exports = router;
