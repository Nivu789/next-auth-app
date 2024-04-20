"use client"

import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'



export default function Login(){
    const router = useRouter()
    const [loading,setLoading] = useState(false)
    const[user,setUser] = useState({
        email:"",
        password:""
    })

    async function handleLogin(e: React.MouseEvent<HTMLButtonElement>){
        e.preventDefault()
        try {
            setLoading(true)
            if(user.email === "" || user.password === ""){
                alert("All fields must be filled out")
            }
            const response = await axios.post("/api/login",user) 
            console.log(response)
            if(response.data.error){
                toast.error(response.data.error)
            }else{
                toast.success(response.data.message)
                router.push(`/profile/${response.data.user.username}`)
            }   
        } catch (error:any) {
            toast.error(error)
        }finally{
            setLoading(false)
        }
        

    }
    
    return (
        <>
        <form  onSubmit={e=>e.preventDefault()} className='flex flex-col gap-4 items-center justify-center h-screen'>
            <h1 className='text-center my-6 text-2xl'>Login</h1>
            
            <div>
                <input className="w-80 h-8 p-4 text-black rounded-lg border-none" type="text" placeholder='enter email' value={user.email} onChange={e=>setUser({...user,email:e.target.value})}/>
            </div>

            
            <div>
                <input className="w-80 h-8 p-4 text-black rounded-lg border-none" type="password" placeholder='enter password' value={user.password} onChange={e=>setUser({...user,password:e.target.value})}/>
            </div>
            
            <div>
                {loading ? <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white'></div> 
                :<button type="submit" onClick={handleLogin} className='bg-slate-600 rounded-xl text-white p-2 hover:bg-white hover:text-black'>Login</button>}
            </div>
        <Link href="/signup">click here to signup</Link>
        </form>
        </>
    )
}