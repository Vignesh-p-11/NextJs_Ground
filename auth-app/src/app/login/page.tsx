"use client"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import User from "@/models/userModel"

const loginPage = () => {

  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const onSignIn=async()=>
  {
    try {
      setButtonDisabled(true);
      const response=await axios.post("/api/users/login",{
        email:user.email,
        password:user.password
      });

      if(response.status===200)
      {
        toast.success("Login successful");
        router.push("/profile");
      }
      else if(response.status===400)
      {
        toast.error("Email and password are required");
      }
      else if(response.status===404)
      {
        toast.error("User not found");
      }
      else if(response.status===401)
      {
        toast.error("Invalid credentials");
      }
      else
      {
        toast.error("Something went wrong");
      }
      console.log("Login response:", response.data);
    }
    catch (error:any) {
      console.error("Login error:", error.response?.data);
      toast.error(error.response?.data?.message || "Login failed");
      setButtonDisabled(false);
    }
  }


  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }},[user]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600">
      
      <div className="bg-white text-black  p-8 rounded-2xl shadow-xl w-full max-w-md">
        
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          LogIn
        </h1>

        {/* Email */}
        <label className="block text-gray-600 mb-1">Email</label>
        <input
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Enter your email"
        />

        {/* Password */}
        <label className="block text-gray-600 mb-1">Password</label>
        <input
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className="w-full p-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Enter your password"
        />

        {/* Button */}
       {
        !buttonDisabled ?(
           <button
          onClick={onSignIn}
          className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
        >
          Sign In
        </button>):(
        <button
          disabled
          className="w-full bg-gray-400 text-white p-3 rounded-lg font-semibold cursor-not-allowed" 
        >
          Sign In
        </button>
        )
       }

        {/* Login Link */}
        <p className="text-center text-gray-600 mt-4">
          New users ?{" "}
          <Link href="/signup" className="text-indigo-600 hover:underline">
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  )
}

export default loginPage