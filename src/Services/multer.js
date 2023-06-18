import multer from "multer";
export const MHE =(err,req,res,next)=>{
if(err){
    return res.status(400).json({message:"multer error",err})

}else{
    next()
}
}
function fileUpload(){
    const storage = multer.diskStorage({})

    function filefilter(req,file,cb){
        if(['image/jpeg','image/png'].includes(file.mimetype)){
        
            cb(null,true)
        }else{
            cb('invalid format',false)
        }
            
    }

    const upload = multer({filefilter,storage})
    return upload
}

export default fileUpload