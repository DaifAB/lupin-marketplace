const router = require("express").Router();
const { uploadImage }=require("../middleware/uploadFiles")
const { getAllAds ,addAds,deleteAds} = require("../controllers/adsController");

router.get("/getAll", getAllAds);
router.post('/add',uploadImage.array('picture',1),addAds);
router.delete("/delete/:id",deleteAds);

module.exports = router;
