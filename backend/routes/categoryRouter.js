const router = require("express").Router();
const {
  addCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
  getCategory,
  getCategPagin,
} = require("../controllers/categoryController");

const { verifySuperAdminToken, verifyAdminToken } = require("../controllers/tokenVerfication/verifyToken")

router.get("/getAll",getAllCategories);
router.get("/get", getCategPagin);
router.delete("/deleteCategory/:id", deleteCategory);
router.get("/:id", getCategory);
router.put("/updateCategory/:id",updateCategory);
router.post("/addCategory", addCategory);
module.exports = router;
