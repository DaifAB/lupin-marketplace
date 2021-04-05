const router = require("express").Router();
const {
  buyerRegister,
  buyerLogin,
  validBuyer,
  getAllBuyers,
  deleteBuyer,
  getBuyersPagin,
} = require("../controllers/buyerController");

router.get("/getAll", getAllBuyers);
router.get("/get", getBuyersPagin);
router.post("/register", buyerRegister);
router.post("/login", buyerLogin);
router.get('/validation/:token',validBuyer)
router.delete("/delete/:id", deleteBuyer);
module.exports = router;
