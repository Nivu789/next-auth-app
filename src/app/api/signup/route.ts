import { NextRequest, NextResponse } from "next/server";
import User from '../../../models/userModel'
import bcrypt from 'bcryptjs'
import { connect } from "../../../dbConfig/dbConfig";
import {sendMail} from '../../../helper/sendEmail'

// connect();

const run = async () => {
    await connect();
    console.log("Connected to myDB");
  }
  
  run()
  .catch((err) => console.error(err))

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

        await sendMail(email)

        return NextResponse.json({message:"Account created successfully"})
    } catch (error) {
        console.log(error)
    }

}