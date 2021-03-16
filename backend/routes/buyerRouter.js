const router = require("express").Router();
const {
  buyerRegister,
  buyerLogin,
  validBuyer,
  getAllBuyers,
} = require("../controllers/buyerController");

router.post("/register", buyerRegister);
router.post("/login", buyerLogin);
router.get('/validation/:token',validBuyer)
router.get("/getAll", getAllBuyers);
module.exports = router;
