
import userModel from "../../../../DB/model/user.model.js"
import cloudinary from "../../../Services/cloudinary.js"

export const profile = (req,res)=>{
    return res.json({message: 'profile'})
}

export const profilePic = async (req,res)=>{
    if(!req.file){
        return res.status(400).json({message:'file is req'})

    }
    
    const {secure_url} = await cloudinary.uploader.upload(req.file.path,{folder:`saraha/user/${req.id}`})

    const  user = await userModel.updateOne({_id:req.id},{profilePic:secure_url})

    return res.status(200).json({message:"profile updated successully"})
} 

