const router = require("express").Router();
const {
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProduct,
  getProductsByUserId,
  getProdPagin,
  getProdPaginBySeller,
} = require("../controllers/productController");

const { uploadImage }=require("../middleware/uploadFiles")

router.get("/getAll", getAllProducts);
router.get("/getProducts", getProdPagin);
router.get("/get/:id", getProdPaginBySeller);
router.post("/addProduct",uploadImage.array('picture',1), addProduct);
router.put("/updateProduct/:id", updateProduct);
router.delete("/deleteProduct/:id", deleteProduct);
router.get("/getProductById/:id", getProduct);
router.get("/getProductsByUserId/:id", getProductsByUserId);


module.exports = router;
