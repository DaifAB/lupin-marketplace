const router = require("express").Router();
const { addOrder, getAllOrders, getOrder, getOrdersPagin } = require("../controllers/orderController");

router.post("/add", addOrder);
router.get("/getAll", getAllOrders);
router.get("/get", getOrdersPagin);
router.get('/:id',getOrder)

module.exports = router;
