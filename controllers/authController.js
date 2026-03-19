const Admin=require("../models/authModel")
const bcrypt=require("bcrypt")

const jwt=require("jsonwebtoken")

exports.register=async(req,res)=>{
    
    const {email,password}=req.body;
    try{
        const hashedPassword=await bcrypt.hash(password,10);
        const admin=new Admin({
           email,
            password:hashedPassword
        });
        await admin.save()
        res.json({message:"Admin created"})
    }catch(err){
        console.log(err)
        res.status(500).json({
            message:"error occured",
            error:err.message
        })
    }
}
exports.login=async(req,res)=>{
    const{email,password}=req.body;
    try{
        const admin= await Admin.findOne({email});
        if(!admin )
            return res.status(400).json({
        message:"not found"});

        const isMatch=await bcrypt.compare(password,admin.password);
        if(!isMatch)  return res.status(401).json({
        message:"wrong password"});

        const token=jwt.sign(
            {
            id:admin._id,role:"admin"
        },
        process.env.JWT_SECRET,
        {expiresIn:"2d"}
    );
    res.json({token})
    }catch(err){
        res.status(500).json({message:"Error"})
    }


}