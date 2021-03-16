const router = require("express").Router();
const {
  sellerRegister,
  resetPassword,
  sellerLogin,
  validSeller,
  getAllSellers,
  sellerPack,
} = require("../controllers/sellerController");

const { verifySellerToken , verifyAdminToken} = require("../controllers/tokenVerfication/verifyToken");

router.post("/register", sellerRegister);
router.get("/getAll", getAllSellers);
router.patch("/resetPassword", verifySellerToken, resetPassword);
router.post("/login", sellerLogin);
router.patch("/validate",verifyAdminToken , validSeller);
router.patch("/upgrade", sellerPack);

module.exports = router;
