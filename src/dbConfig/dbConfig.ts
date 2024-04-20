import mongoose from "mongoose";

export async function connect(){
    try {
        await mongoose.connect("mongodb+srv://nivuyt789:nivedneha@cluster0.y8jmmms.mongodb.net/")
        .then(()=>console.log("mongoDb connected"))
        .catch((err)=>console.log(err))
    } catch (error) {
        console.log(error)
    }
}