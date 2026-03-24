const Student = require("../models/studentModels")
const bcrypt=require("bcrypt")
// Add Student
exports.addStudent = async (req, res) => {
  try {
 
    const { name, email, className, phone, totalFee, paidAmount,dueAmount,status,password } = req.body
       const hashedPassword=await bcrypt.hash(password,10);
    // Quick validation
    if (!name || !email || !className || !phone || !totalFee || !paidAmount||!password ) {
      return res.status(400).json({ message: "All fields are required ❌" })
    }

    const student = new Student({
      name,
      email,
      className,
      phone,
      totalFee,
      paidAmount,
      dueAmount,
      status,
      password:hashedPassword, 
      image: req.file ?
      `${req.protocol}://${req.get("host")}/uploads/$(req.file.filename)`  : null
    })

    await student.save()
    res.status(201).json({ message: "Student added successfully ✅", student })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error ❌", error: err.message })
  }
}

// Update Student
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params
    const { name, email, className, phone, totalFee, paidAmount,dueAmount,status,password } = req.body

    const updateData = { name, email, className, phone, totalFee, paidAmount,dueAmount,status,password }
    if(password){
      updateData.password= await bcrypt.hash(password,10);
    }
    if (req.file) {
      updateData.image=`${req.protocol}://${req.get("host")}/uploads/$(req.file.filename)`;
    }

    const student = await Student.findByIdAndUpdate(id, updateData, { new: true })
    if (!student) return res.status(404).json({ message: "Student not found ❌" })
      student.password=undefined;

    res.json({ message: "Student updated successfully ✅", student })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error ❌", error: err.message })
  }
}

exports.deleteStudent=async(req,res)=>{
  try{
    const{id}=req.params;
    const student= await Student.findByIdAndDelete(id);
     if(!student) 
      return res.status(404).json({message:"no student"});

    res.json({message:"Student deleted"});
}catch(err){
   res.status(500).json({message:"server error"})
}

  }


  //get
  exports.getAllStudents =async(req,res)=>{
    try{
      const students=await Student.find();
      res.json(students);
      res.status(500).json({
        message:"Server error",error:err.message
      })
    }catch(err){
   res.status(500).json({message:"server error"})
}
  };
    exports.getStudentById =async(req,res)=>{
    try{
      const {id}=req.params;
      const student=await Student.findById(id)

      if(!student)
        return res.status(404).json({message:"student not found"})
      res.json(student);
  
      }catch(err){
   res.status(500).json({message:"server error"})}
    }
