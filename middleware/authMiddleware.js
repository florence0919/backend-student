const jwt=require("jsonwebtoken");
module.exports=(req,res,next)=>{
  
      
      const token= req.headers.authorization;



 
          
   

    if(!token) return res.status(401).json({message:"no token"});
    try{
        const decoded =jwt.verify(token,process.env.JWT_SECRET);
        if(decoded.role !=="admin"){
            return res.status(403).json({message:"Access denied(Admin only)"})
        }
        req.admin=decoded;
        next();
      
    }catch(err){
        res.status(401).json({
            message:"invalid token"
        })
    }
}