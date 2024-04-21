"use client"
import axios from 'axios'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function VerifyEmail(){
    const router = useRouter()
    const [token,setToken] = useState("")
    const[verified,setVerified] = useState(false)


    const verifyUserEmail = async() =>{
        try {
            axios.post("/api/verify-email",{token})
            setVerified(true)
            setTimeout(() => {
                router.push('/login')
            }, 3000);
        } catch (error:any) {
            toast.error(error)
        }
    }


    useEffect(()=>{
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "")
    },[])

    useEffect(()=>{
        if(token.length > 0){
            verifyUserEmail()
        }
    },[token])
    

    return (
        <>
        {verified ? <div className='text-center my-52'>Account was verified, redirecting to login page....</div> : <div className='text-center my-52'>Check email to verify account</div>}
        </>
    )
}