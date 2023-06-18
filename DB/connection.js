import mongoose from "mongoose";
const connecteDB = async ()=>{
    return await mongoose.connect(process.env.DB_LOCAL)
    .then(()=>{
        console.log('connect db')
    }).catch((err)=>{
        console.log(`error connecting ${err}`)
    })
}

export default connecteDB