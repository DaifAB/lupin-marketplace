const router = require("express").Router();
const { adminRegister, adminLogin, getAllAdmins,deleteAdmin } = require("../controllers/adminController");

router.post("/addAdmin", adminRegister);
router.post("/login", adminLogin);
router.get("/getAll", getAllAdmins);
router.delete('/deleteAdmin',deleteAdmin)

module.exports = router;
