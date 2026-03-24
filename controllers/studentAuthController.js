const Student=require("../models/studentModels");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");


exports.login=async(req,res)=>{
    try{
        const{email,password}=req.body;
        const student=await Student.findOne({email}).select("+password");
        if(!student) return res.status(400).json({message:"Student not Found"})

            const isMatch= await bcrypt.compare(password,student.password);
            if(!isMatch) return res.status(401).json({message:"Incorrect Paaword"})

                const token=jwt.sign({
                    id:student._id,
                    role:"student"
                },
                    process.env.JWT_SECRET,{
                        expiresIn:"2d"
                    }
                 
            )
             student.password=undefined;
             res.json({
                message:"Login Successfull",
                token,
                student

             })
                
    }catch(err){
        console.error(err);
        res.status(500).json({message:" there is error"})
    }
}