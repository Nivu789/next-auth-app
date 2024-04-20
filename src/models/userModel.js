import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    forgotToken:String,
    forgotTokenExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date
})

const User = mongoose.models.user || mongoose.model("user",userSchema)

export default User