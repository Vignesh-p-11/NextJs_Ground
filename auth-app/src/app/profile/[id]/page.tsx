import React from 'react'

const UserProfile = async ({ params }: any) => {

  const resolvedParams = await params;   // ✅ unwrap promise
  const id = resolvedParams.id;

  console.log("Params:", resolvedParams);

  return (
    <div className='min-h-screen flex flex-col py-3 bg-blue-100 justify-center items-center'>
      <div className='bg-white p-5 rounded-lg shadow-lg w-96 text-center'>
        
        <h1>User Profile</h1>

        <p>User ID :</p>

        <span className='text-black bg-green-500 font-bold'>
          {id}
        </span>

      </div>
    </div>
  )
}

export default UserProfile