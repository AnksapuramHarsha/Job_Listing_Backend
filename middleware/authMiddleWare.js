const jwt=require("jsonwebtoken");

const verifyToken=(req,res,next)=>{
    try{
        // const token=req.header("Authorization");//manully passing in header
        const token=req.cookies.token//passing token using cookies, no need of passing manually
        if(!token){
            return res.status(401).json({
                message:"Unauthorized access"
            })
        }
        const decode=jwt.verify(token,process.env.SECRET_KEY);
        next();

    } catch(e){
        console.log(error);
        // res.status(401).json({
        //     message:"Invalid Token"
        // })
    }
}

module.exports=verifyToken;