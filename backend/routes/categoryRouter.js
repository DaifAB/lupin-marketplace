const router = require("express").Router();
const {
  addCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
  getCategory,
} = require("../controllers/categoryController");

router.get("/getAll", getAllCategories);
router.delete("/deleteCategory/:id", deleteCategory);
router.get("/:id", getCategory);
router.put("/updateCategory/:id", updateCategory);
router.post("/addCategory", addCategory);
module.exports = router;
