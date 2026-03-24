const express=require("express")
const { login } = require("../controllers/studentAuthController")
const router=express.Router()
const stdAuth=require("../middleware/studentAuthMiddleware")
const { getMyProfile } = require("../controllers/studentProfileController")

router.post("/login",login)
router.get("/profile",stdAuth,getMyProfile)
router.get("/profile/:id",stdAuth,getMyProfile)

module.exports=router;