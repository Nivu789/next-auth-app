"use client"

import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'



export default function Signup(){
    const router = useRouter()
    const[user,setUser] = useState({
        username:"",
        email:"",
        password:""
    })

    const [loading,setLoading] = useState(false)

    async function handleSignup(e: React.MouseEvent<HTMLButtonElement>){
        e.preventDefault()
        try {
            if(user.username === "" || user.email === "" || user.password === ""){
                return toast.error("All fields must be filled out")
            } 
            setLoading(true)
            const response = await axios.post("/api/signup",user)
            console.log("Response from backend",response)
            if(response.data.error){
                toast.error(response.data.error)
            }else{
                toast.success(response.data.message)
                router.push('/login')
            }
            
        } catch (error:any) {
            toast.error(error)
        }finally{
            setLoading(false)
        }
       

    }
    
    return (
        <>
        <motion.div transition={{type:'spring'}} animate={{ scale: 1.1 }}>
        <form className='flex flex-col gap-4 items-center justify-center h-screen' onSubmit={(e) => e.preventDefault()}>
            <h1 className='text-center my-6 text-2xl'>Signup</h1>
            <div>
                <input className="w-80 h-8 p-4 text-black rounded-lg border-none" type="text" placeholder='enter username' value={user.username} onChange={e=>setUser({...user,username:e.target.value})}/>
            </div>
            
            <div>
                <input className="w-80 h-8 p-4 text-black rounded-lg border-none" type="text" placeholder='enter email' value={user.email} onChange={e=>setUser({...user,email:e.target.value})}/>
            </div>

            
            <div>
                <input className="w-80 h-8 p-4 text-black rounded-lg border-none" type="password" placeholder='enter password' value={user.password} onChange={e=>setUser({...user,password:e.target.value})}/>
            </div>
            
            <div>
                {loading ? <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white'></div> 
                : <button type="submit" onClick={handleSignup} className='bg-slate-600 rounded-xl text-white p-2 hover:bg-white hover:text-black'>Signup</button>}
            </div>
        <Link href="/login">click here to login</Link>
        </form>
        </motion.div>
        </>
    )
}