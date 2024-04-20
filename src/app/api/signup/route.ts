import { NextRequest, NextResponse } from "next/server";
import User from '../../../models/userModel'
import bcrypt from 'bcryptjs'
import { connect } from "../../../dbConfig/dbConfig";

connect();

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const { username , email , password} = reqBody

        const emailExist = await User.findOne({email:email})
        if(emailExist){
            return NextResponse.json({error:"User with that email already exist"})
        }

        const hashedPassword = await bcrypt.hash(password,10)
        
        await User.create({
            username,
            email,
            password:hashedPassword
        })

        return NextResponse.json({message:"Account created successfully"})
    } catch (error) {
        console.log(error)
    }

}