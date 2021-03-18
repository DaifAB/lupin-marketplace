const router = require("express").Router();

const { getAllAds ,addAds,deleteAds} = require("../controllers/adsController");

router.get("/getAll", getAllAds);
router.post('/add',addAds);
router.delete("/delete",deleteAds);

module.exports = router;
