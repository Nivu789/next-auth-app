"use client"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"



export default function logoutButton(){
    const router = useRouter()
    async function handleLogout(){
        try {
            const response = await axios.get("/api/logout")
            console.log(response)
            if(response.data.message){
                toast.success(response.data.message)
                router.push('/login')
            }
    
        } catch (error) {
            toast.error(error)
        }
    }

    return <button onClick={handleLogout}>Logout</button>
}