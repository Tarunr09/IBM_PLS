import React from 'react'
import signupImg from "../assets/sign.jpg"
import Template from '../components/Template'

const Signup = ({setIsLoggedIn}) => {
  return (
    <Template
      title="Welcome to IBM"
      // desc1="Build skills for today, tomorrow, and beyond."
      // desc2="Education to future-proof your career."
      image={signupImg}
      formtype="signup"
      setIsLoggedIn={setIsLoggedIn}
    />
  )
}

export default Signup
