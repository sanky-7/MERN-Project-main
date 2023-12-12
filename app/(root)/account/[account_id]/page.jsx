"use client"
import { AuthContextProvider } from "@/context/AuthContext"
import { UserAccount } from "@/components"

export default function account({params}) {
  return(
    <AuthContextProvider>
      <UserAccount id={params.account_id}/>
    </AuthContextProvider>
  )
}