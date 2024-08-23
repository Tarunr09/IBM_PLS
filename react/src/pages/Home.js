// import React from 'react'

// const Home = ({isLoggedIn}) => {
//   return (
//     <div className='flex justify-center items-center text-white text-3xl h-full'>
//       Home
//     </div>
//   )
// }

// export default Home
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';


const Home = ({isLoggedIn}) => {
  return (
    <div className="flex flex-col space-y-20 items-center justify-center h-4/6">
        <h2 className="text-5xl font-bold text-white ">Welcome to PLS</h2>
        <div className="flex items-center">
        <Link to="/signup">  {/* Link component for navigation */}
          <button className="bg-yellow-50 text-2xl rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6">Sign Up</button>
        </Link>
          {/* <button className="bg-yellow-50 text-2xl rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6">Sign Up</button> */}
          <span className="mx-2">or</span>
        <Link to="/login">  {/* Link component for navigation */}
          <button className="bg-yellow-50 text-2xl rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6">Log In</button>
        </Link>
          {/* <button className="bg-transparent hover:bg-blue-500 text-white font-bold py-2 px-4 border border-white rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Login</button> */}
          {/* <button className="bg-yellow-50 text-2xl rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6">Log In</button> */}

        </div>
    </div>
  )
}

export default Home
