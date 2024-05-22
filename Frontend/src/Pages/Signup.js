import React, { useState } from 'react';
import axios from 'axios';
import bg1 from "../assets/bg-2.jpg";
import {useNavigate} from "react-router-dom"




const SignUp = () => {
  // State variables to store user input
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  
  const navigate= useNavigate();
  //Redirects to login if there already is an account
  const handleClick = () => {
      navigate("/login");
  }
  
  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      //POST Request
      const response = await axios.post('http://localhost:5000/api/users', {
        name,
        username,
        email,
        password
      });
      console.log('User created', response.data);
      

      navigate('/profile?email=' + encodeURIComponent(email));

      
      
      // Clear form fields after successful submission
      setName('');
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      {/* Image section */}
      <div className="w-1/3 h-full  flex items-center justify-center">
      <span className="absolute top-4 left-4 text-xl text-white">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </span>
        <img src={bg1} alt="" className="w-auto h-full object-cover" />
      </div>
      {/* Form section */}
      <div className="w-2/3 p-8 flex justify-center ">
        <form onSubmit={handleSubmit} className='w-full max-w-xl'>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Create a New Account</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Name input */}
        <div>
          <label htmlFor="name" className="block text-base font-medium text-gray-700 ">Name</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 p-3 block w-full rounded-md border-gray-300  bg-gray-200" />
        </div>
        {/* Username input */}
        <div>
          <label htmlFor="username" className="block text-base font-medium text-gray-700">Username</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="mt-1 p-3 block w-full rounded-md border-gray-300  bg-gray-200" />
        </div>
      </div>
      {/* Email input */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-base font-medium text-gray-700">Email</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 p-3 block w-full rounded-md border-gray-300  bg-gray-200" />
      </div>
      {/* Password input */}
      <div className="mb-4">
        <label htmlFor="password" className="block text-base font-medium text-gray-700">Password</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 p-3 block w-full rounded-md border-gray-300  bg-gray-200" />
      </div>
      <div className="mb-4">
        <input type="checkbox" id="checkbox" required /><label className="block text-base font-medium text-gray-700">Creating an account means you're okay with our Terms of Service, Privacy Policy, and out default Notification Settings </label>
      </div>
      {/* Submit button */}
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Create Account</button>
      
    </form>
  </div>
  <h2 className="absolute top-8 right-8 text-lg text-black-500 hover:text-blue-700 cursor-pointer">
    <div onClick={handleClick}>Already have an account? Log in</div>
  </h2>
</div>
  );
};

export default SignUp;