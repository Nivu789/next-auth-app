import { NextRequest , NextResponse } from "next/server";
import User from '../../../models/userModel'
import { connect } from "@/dbConfig/dbConfig";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect()

export async function POST(request:NextRequest){
    try {
        const requestData = await request.json()
        const {email,password} = requestData
        const user = await User.findOne({email:email})
        if(user){
            const passCheck = await bcrypt.compare(password,user.password)
            if(passCheck){
                const tokenData = {
                    id:user._id,
                    email:user.email,
                    username:user.username
                }
                const token = jwt.sign(tokenData,"tokenSecret",{expiresIn:"1d"})
                const response = NextResponse.json({message:"Login Successfull",user})
                response.cookies.set("token",token,{httpOnly:true})
                response.cookies.set("user",user.username,{httpOnly:true})
                return response
            }else{
                return NextResponse.json({error:"Wrong credentials"})
            }
        }
        return NextResponse.json({error:"No such user found"})
      
    } catch (error) {
        console.log(error)
    }
       
}