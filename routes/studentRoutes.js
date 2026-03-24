const express = require("express")
const router = express.Router()
const { addStudent, updateStudent, deleteStudent, getAllStudents,getStudentById} = require("../controllers/studentController")
const upload = require("../config/multer")
const stdAuth=require("../middleware/studentAuthMiddleware")



const auth=require("../middleware/authMiddleware")
// POST student  image
router.post("/",upload.single("image"),auth, addStudent)

// Update student 
router.put("/:id",upload.single("image"),auth, updateStudent)
//delete
router.delete("/:id",auth,deleteStudent)
//getstudent
router.get("/",auth,getAllStudents)
router.get("/:id",auth,getStudentById)



module.exports = router 