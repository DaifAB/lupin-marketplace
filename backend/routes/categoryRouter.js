const router = require("express").Router();
const {
  categoryRegisterer,
  categoryDelete,
  getAllCategories,
  updateCategory,
  getOneCat,
} = require("../controllers/categoryController");

router.get("/", getAllCategories);
router.delete("/:id", categoryDelete);
router.get("/:id", getOneCat);
router.put("/:id", updateCategory);
router.post("/", categoryRegisterer);
module.exports = router;
