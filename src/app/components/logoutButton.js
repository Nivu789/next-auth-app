"use client"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { useState } from "react"
  



export default function logoutButton(){
    const [showLogoutButton, setShowLogoutButton] = useState(false);
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

    return(
        <>
        <AlertDialog>
  <AlertDialogTrigger><Button>Logout</Button></AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action will log you out of your account
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleLogout}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
</>
    )
}