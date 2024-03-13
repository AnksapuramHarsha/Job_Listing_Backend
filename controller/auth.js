const User=require("../models/user")
const bcrypt=require("bcrypt");

const jwt=require("jsonwebtoken")




const registerController=async(req,res)=>{
    console.log("in register")
    try{
        const {name, email, password}=req.body
        if(!name ||!email || !password){
            return res.status(400).json({
                errorMessage:"Bad Request"
            })
        }
        const isExistingUser=await User.findOne({email:email})
        if(isExistingUser){
            return res.status(402).json({
                errorMessage:"User Already exists"
            });
        }
        const hashedPassword= await bcrypt.hash(password,10)
        console.log(hashedPassword);
        const userData=new User({
            name,
            email,
            password:hashedPassword
        })
        await userData.save();
        res.status(402).json({
            message:"user registration successfull"
        })
        
    }
    catch(e){
        console.log(e)
    }
}

const loginController=async(req,res)=>{
    try{

        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({
                errorMessage:"fields can not be empty",
            });
    
        }
        const userDetails=await User.findOne({email});
        if(!userDetails){
            return res.status(401).json({
                errorMessage:"invalid credentials"
            })
        }
        const passwordMatch=await bcrypt.compare(password,userDetails.password)
        if(!passwordMatch){
            return res.status(401).json({
                errorMessage:"credentials are invalid"
            })
        }
        const token =jwt.sign({id:userDetails._id},process.env.SECRET_KEY)
        // console.log(token);

        res.cookie("token",token,{htttpOnly:true})

        res.json({
            message:"User logged in successfully",
            name:userDetails.name,
            token:token
        })
    }catch(e){
        console.log(e);
    }
}

module.exports={registerController,loginController}