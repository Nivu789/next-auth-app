import { NextRequest , NextResponse } from "next/server";
import User from '../../../models/userModel'
import { connect } from "@/dbConfig/dbConfig";
import bcrypt from 'bcryptjs'

connect()

export async function POST(request:NextRequest){
    const requestData = await request.json()
    const {email,password} = requestData
    const user = await User.findOne({email:email})
    if(user){
        const passCheck = await bcrypt.compare(password,user.password)
        if(passCheck){
            return NextResponse.json({message:"Login Successfull",user})
        }
    }
    return NextResponse.json({error:"No such user found"})
}