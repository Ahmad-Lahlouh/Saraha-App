import { compare } from "bcrypt"
import { hash } from "../../../Services/hashAndCompare.js"
import { generateToken, verifyToken } from "../../../Services/generateAndVerifyToken.js"
import { signupSchema,loginSchema } from "../Auth.validation.js"
import { sendEmail } from "../../../Services/sendEmail.js"
import { verify } from "jsonwebtoken"
import userModel from "../../../../DB/model/user.model.js"

export const signup = async (req,res)=>{

        const {userName,email,password} =req.body

        const user = await userModel.findOne({email})
        if(user){
            return res.status(409).json({messaeg:'email exist'})
        }
        
        const hashPassword = hash(password)
        const token= generateToken({email},process.env.EMAIL_TOKEN)
        const link = `http://localhost:3000/auth/confrimEmail/${token}`
        await sendEmail(email,'confirm email',`<a href="${link}">verify your email</a>`)
    
        const createUser = await userModel.create({userName,email,password:hashPassword})
    
        return res.status(201).json({message:"Done",user:createUser._id})

    }

export const  confrimEmail = async (req,res)=>{
        const {token} = req.params
        const decoded= verifyToken(token,process.env.EMAIL_TOKEN)
        // if(!decoded){
        //     return res.json({message:'invalid token'})
        // }
        const user = await userModel.updateOne({email:decoded.email},{confirmEmail:true})
        return res.redirect('https://www.facebook.com//')
    }


export const login = async(req,res)=>{
 
    const{email,password} =req.body

    const user = await userModel.findOne({email})
    if(!user){
        return res.status(404).json({message:"email not exist"})
    }else{
        if(!user.confirmEmail){
            return res.json({message:'pls verify your email'})

        }
        const match = compare(password,user.password)
        if(!match){
            return res.json({message:"invalid password"})
        }else{

            const token = generateToken({id:user._id})
            return res.status(200).json({message:"Done",token})
        }
    }

    






}