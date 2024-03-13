const express=require("express")
const Job = require("../models/job")



const createPost=async(req,res)=>{
    console.log("inside create api");
    try{
        const {companyName,title,description,logoUrl,salary,location,duration,locationType,skills}=req.body;
        if(!companyName||!title||!description||!logoUrl||!salary||!location||!duration||!skills){
            return res.status(400).json({
                errorMessage:"Bad Request"
            })
        }
        const jobDetails=new Job({
            companyName,
            title,
            description,
            logoUrl,
            salary,
            location,
            duration,
            locationType,
            skills
        })
        await jobDetails.save()
        res.json({
            message:"Job created Successfully"
        })

    } catch(e){
        console.log(e);
    }
}


const getDetails=async(req,res,next)=>{
    try{
        const jobId=req.params.jobid;
        if(!jobId){
            res.status(400).json({
                errorMessage:"Bad Request"
            })
        }
        const jobDetails=await Job.findById(jobId)
        res.json({data:jobDetails})
    }
    catch(e){
        console.log(e)
    }
}

const updateDetails=async(req,res,next)=>{
    try{
        const {companyName,title,description,logoUrl,salary,location,duration,locationType,skills}=req.body;
        if(!companyName||!title||!description||!logoUrl||!salary||!location||!duration||!skills){
            return res.status(400).json({
                errorMessage:"Bad Request"
            })
        }
        const jobId=req.params.jobid
        await Job.updateOne(
            {_id:jobId},
            {
                $set:{
                    companyName,
                    title,
                    description,
                    logoUrl,
                    salary,
                    location,
                    duration,
                    locationType,
                    skills
                }
            }
            )

        res.json({
            message:"updated Successfully"
        })


    }catch(e){
        console.log(e);
    }
}

const getAllJobs=async(req,res,next)=>{
    try{
        const title=req.query.title; //using ?title=pqr in req
        

        const jobList= await Job.find(
            // {},// 1st field filter(no filter applied)
            // react js developer
            // Js developer
            // backend JS developer
            // JS,jS,Js-substring match(regex)and option-i=:ignore cases
            // {title:title},
           
            {
            title:{$regex:title,$options:"i"},
            skills:{$in:["html","css"]} //in any one skills matches
            },//filter

            {title:1, logoUrl:1, companyName:1,skills:1}//projection (project the mentioned fields)
            );
        res.json({data:jobList})
    }
    catch(err){
        console.log(err);
    }

}

module.exports={createPost,getDetails,updateDetails,getAllJobs}