const express=require("express")
const router= express.Router();


const verifyToken=require("../middleware/authMiddleWare")
const jobController=require("../controller/job")

router.post('/create',verifyToken,jobController.createPost)

router.get('/details/:jobid',jobController.getDetails)

router.put('/edit/:jobid',jobController.updateDetails)

router.get('/all_jobs',jobController.getAllJobs)





module.exports=router;