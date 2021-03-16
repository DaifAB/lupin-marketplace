const router = require("express").Router();
const {
  productRegister,
  getAllProducts,
  productUpdated,
  productDeleted,
  getOneProduct,
} = require("../controllers/productController");
const {upload}=require("../middleware/uploadFiles")
router.get("/", getAllProducts);
router.post("/",upload.array('picture',3), productRegister);
router.put("/:id", productUpdated);
router.delete("/", productDeleted);
router.get("/:id", getOneProduct);

module.exports = router;
