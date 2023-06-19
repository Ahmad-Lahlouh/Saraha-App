import userModel from "../../DB/model/User.model.js";
import { verifyToken } from "../Services/generateAndVerifyToken.js";

export const auth = async (req,res,next)=>{
    try{
        const {authorization} = req.headers;

        if(!authorization?.startsWith(process.env.BEARERKEY)){
            return res.json({message:'invalid bearer key'})
        }
        const token = authorization.split(process.env.BEARERKEY)[1]
        if(!token){
            return res.json({message:'invalid token'})
        }
        const decoded = verifyToken(token)
        const authUser = await userModel.findById(decoded.id).select("userName email")
    
        if(!authUser){
            return res.status(401).json({message:'not registered'})
    
        }
        req.id = decoded.id
        next()
    }catch(error){
        return res.json({message:'catch error',error:error.stack})
    }
}