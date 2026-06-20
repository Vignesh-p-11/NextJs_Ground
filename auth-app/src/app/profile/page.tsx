"use client"
import React from 'react'
import axios from 'axios'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { routeModule } from 'next/dist/build/templates/pages'


const ProfilePage = () => {

  const [profileData, setProfileData] = React.useState("nothing");
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed");
    }
  };

  const getUserDetails=async()=>{
    try {
      const response = await axios.get("/api/users/me");
      console.log("User details:", response.data);
      toast.success("User details fetched successfully");
      setProfileData(response.data.data._id);
    } 
    catch(error)
    {
      console.error("Error fetching user details:", error);
      toast.error("Failed to fetch user details");
    }
  }

  return (
    <div>ProfilePage
      <hr/>
      <h3>
        {
          profileData==='nothing' ? "User Data Not Fetched":
          <Link href={`/profile/${profileData}`}>{profileData}</Link>
        }
      </h3>
       
       <button className='bg-green-500 text-white px-4 py-2 rounded' onClick={getUserDetails}>
        Load User Details
      </button>

      <button className='bg-blue-500 text-white px-4 py-2 rounded' onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

export default ProfilePage