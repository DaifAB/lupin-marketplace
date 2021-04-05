const router = require("express").Router();
const { deliveryManAdd, getAllDeliveryMen, deleteDeliveryMen, getDeliveryMenPagin } = require("../controllers/deliveryMan");

router.post("/add", deliveryManAdd);
router.get("/getAll", getAllDeliveryMen);
router.get("/get", getDeliveryMenPagin);
router.delete('/delete/:id',deleteDeliveryMen)

module.exports = router;
