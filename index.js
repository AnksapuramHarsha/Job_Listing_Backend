const env=require("dotenv")
env.config();  // to configure mongodburl from .env 

const express=require('express')
const mongoose=require("mongoose");
const auth=require("./routes/auth")
const job=require("./routes/job")
const cookieParser=require("cookie-parser");

const app=express()
app.use(express.json());
app.use(cookieParser());


mongoose.connect(process.env.MONGODBURL)
        .then(()=>console.log("Db connected"))
        .catch((e)=>console.log(e))


const PORT = process.env.PORT || 3000;

//get, post ,put,patch,delete


const port = process.env.PORT || 3000;

app.get('/',(req,res) =>{
    res.json({name:"harsha",
            time:new Date(),
})
})

app.use('/api/v2/auth',auth);
app.use('/api/v2/job',job);



app.listen(port,()=>{
  console.log(`Server is running at http://localhost:${port}`);
})