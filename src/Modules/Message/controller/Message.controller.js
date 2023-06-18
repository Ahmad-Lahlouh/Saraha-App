import userModel from "../../../../DB/model/user.model.js"
import messageModel from "../../../../DB/model/Message.model.js"

export const getMessages = async (req,res)=>{
    const messagesList = await messageModel.find({receiverId:req.id})
    return res.json({message:"success",messagesList})
}


export const sendMessage =
    async (req,res)=>{
        const{receiverId} = req.params
        const {message} = req.body
    
        const user = await userModel.findById(receiverId)
        if(!user){
            return res.status(404).json({message:'invalid acount Id'})
        }
        const createMessage = await messageModel.create({receiverId,message})
        return res.status(201).json({message:'success',createMessage})
    }

    export const deleteMessages =async (req,res)=>{
        const id = req.id
        const {messageId}= req.params
        const message = await messageModel.deleteOne({_id:messageId,receiverId:id})
        if(message.deletedCount == 0){
            return res.status(400).json({message: 'invalid user id or message id'})

        }
        return res.json({message: 'success'})

    }


