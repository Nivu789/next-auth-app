import mongoose from "mongoose";


export async function connect(){
    try {
        const connectionString = process.env.MONGO_URI
        console.log(connectionString)
        await mongoose.connect(process.env.MONGO_URI!)
        .then(()=>console.log("mongoDb connected"))
        .catch((err)=>console.log(err))
    } catch (error) {
        console.log(error)
    }
}