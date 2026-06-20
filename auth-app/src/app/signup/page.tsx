"use client"
import React,{useEffect, useState} from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const signupPage = () => {

  const router=useRouter();
  const [user,setUser]=useState({
    name:"",
    email:"",
    password:""
  })

  const [buttonDisabled,setButtonDisabled]=useState(false);

  const onSignUp=async()=>
  {
    try {
      setButtonDisabled(true);
      const response=await axios.post("/api/users/signup",{
        username:user.name,
        email:user.email,
        password:user.password
      });
      if(response.status===201)
      {
        toast.success("User created successfully");
      }
      else if(response.status===400)
      {
        toast.error("User already exists");
      }
      else
      {
        toast.error("Something went wrong");
      }
      console.log("Signup response:", response.data);
      router.push("/login");
    } catch (error:any) {      
      console.error("Signup error:", error.response?.data);
      toast.error(error.response?.data?.message || "Signup failed");
      setButtonDisabled(false);
    }
  }

  useEffect(() => {
    if (user.name.length > 0 && user.email.length>0 && user.password.length > 0 ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }}
    ,[user])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600">
      
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-black
      ">
        
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h1>

        {/* Name */}
        <label className="block text-gray-600 mb-1">Name</label>
        <input
          type="text"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Enter your name"
        />

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
          !buttonDisabled ? (
            <button
              onClick={onSignUp}
              className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
            >
              Sign Up
            </button>
          ) : (
            <button
              disabled
              className="w-full bg-gray-400 text-gray-600 p-3 rounded-lg font-semibold cursor-not-allowed"
            >
              Sign Up
            </button>
          )
        }

        {/* Login Link */}
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  )
}

export default signupPage   