const router = require("express").Router();
const { adminRegister, adminLogin, getAllAdmins,deleteAdmin, getAdminsPagin } = require("../controllers/adminController");
const { verifySuperAdminToken } = require("../controllers/tokenVerfication/verifyToken")

router.get("/getAll",(verifySuperAdminToken,getAllAdmins));
router.get("/get",(verifySuperAdminToken,getAdminsPagin));
router.post("/add",(verifySuperAdminToken,adminRegister));
router.post("/login", adminLogin);
router.delete('/deleteAdmin/:id',(verifySuperAdminToken,deleteAdmin))

module.exports = router;
