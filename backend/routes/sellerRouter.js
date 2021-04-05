const router = require("express").Router();
const {
  sellerRegister,
  resetPassword,
  sellerLogin,
  validSeller,
  getAllSellers,
  sellerPack,
  deleteSeller,
  getSeller,
  getSellersPagin,
  updateTurnOver,
} = require("../controllers/sellerController");

const { verifySellerToken , verifyAdminToken} = require("../controllers/tokenVerfication/verifyToken");

router.post("/register", sellerRegister);
router.get("/getAll", getAllSellers);
router.get("/get", getSellersPagin);
router.patch("/resetPassword", verifySellerToken, resetPassword);
router.post("/login", sellerLogin);
router.patch("/validate",verifyAdminToken , validSeller);
router.patch("/upgrade/:id", sellerPack);
router.patch("/updateTurnOver/:id", updateTurnOver);
router.delete("/delete/:id",deleteSeller)
router.get("/getOne/:id",getSeller)

module.exports = router;
