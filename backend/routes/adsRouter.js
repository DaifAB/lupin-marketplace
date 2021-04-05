const router = require("express").Router();
const { uploadImage }=require("../middleware/uploadFiles")
const { getAllAds ,addAds,deleteAds, getAdsPagin} = require("../controllers/adsController");

router.get("/getAll", getAllAds);
router.get("/get", getAdsPagin);
router.post('/add',uploadImage.array('picture',1),addAds);
router.delete("/delete/:id",deleteAds);

module.exports = router;
