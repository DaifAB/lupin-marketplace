const router = require("express").Router();
const { adminRegister, adminLogin, getAllAdmins,deleteAdmin } = require("../controllers/adminController");
const { verifySuperAdminToken } = require("../controllers/tokenVerfication/verifyToken")

router.post("/add",verifySuperAdminToken,adminRegister);
router.post("/login", adminLogin);
router.get("/getAll",verifySuperAdminToken, getAllAdmins);
router.delete('/deleteAdmin/:id',verifySuperAdminToken,deleteAdmin)

module.exports = router;
