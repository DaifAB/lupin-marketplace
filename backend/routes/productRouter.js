const router = require("express").Router();
const {
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProduct,
} = require("../controllers/productController");

const { uploadImage }=require("../middleware/uploadFiles")

router.get("/getAll", getAllProducts);
router.post("/addProduct",uploadImage.array('picture',3), addProduct);
router.put("/updateProduct/:id", updateProduct);
router.delete("/deleteProduct/:id", deleteProduct);
router.get("/:id", getProduct);

module.exports = router;
