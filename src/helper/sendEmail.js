import nodemailer from 'nodemailer'
import bcrypt from 'bcryptjs'
import User from '../models/userModel'

export async function sendMail(email){
    try {

        const hashedValue = await bcrypt.hash(email.toString(),10)
        await User.findOneAndUpdate({email:email},{$set:{verifyToken:hashedValue,verifyTokenExpiry:Date.now()+3600000}})

        var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "1d319f744d51b0",
              pass: "38f674c53652f7"
            }
          });
    
          async function main() {
            // send mail with defined transport object
            const info = await transporter.sendMail({
              from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
              to: email, // list of receivers
              subject: "Verify your account", // Subject line
              html: `<b><a href='${process.env.NEXT_PUBLIC_DOMAIN}/verify-email?token=${hashedValue}'>Click here<a></b>to verify your account or copy paste the below link in your browser
              <br>${process.env.NEXT_PUBLIC_DOMAIN}/verify-email?token=${hashedValue}`, // html body
            });
          
            console.log("Message sent: %s", info.messageId);
            // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
          }
          
          main().catch(console.error); 
    } catch (error) {
        console.log(error)
    }
    
}