import React, { useState } from 'react';
import axios from 'axios';
import bg1 from "../assets/bg1.jpg";


const SignUp = () => {
  // State variables to store user input
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usernameTaken, setUserNameTaken] = useState(false);
  

  // Function to handle form submission
  const handleSubmit = async(event) => {
    event.preventDefault();
    const isUserNameTaken = await checkUserName(username);

  if (isUserNameTaken) {
    setUserNameTaken(true);
    return; // Exit early if the username is taken
  }
    try{
      const response = await axios.post('/api/users',{
        
        name,
        username,
        email,
        password
      });
      console.log('User created', response.data)
      
      setName('');
      setUsername('');
      setEmail('');
      setPassword('');
    } catch(error){
      console.error('Error creating user:', error)
    }
  };

  const checkUserName= async(username)=>{
    return false;
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {/* Image section */}
      <div className="w-1/3 ">
        <img src={bg1} alt="" className="w-full h-auto" />
      </div>
      {/* Form section */}
      <div className="w-2/3 p-8 flex justify-center">
        <form onSubmit={handleSubmit} className='w-full max-w-md'>
          {/* Name input */}
          
        <label className="top-0 left-0 right-0 text-2xl font-bold text-center">Create Account</label>
        {usernameTaken && (
          <p className="text-red-500 mb-4">Username is already taken. Please choose a different one.</p>
        )}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 p-2 block w-full md:w-1/2 rounded-md border-gray-300" />
          </div>
          {/* Username input */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="mt-1 p-2 block w-full md:w-1/2 rounded-md border-gray-300" />
          </div>
          {/* Email input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 p-2 block w-full md:w-1/2 rounded-md border-gray-300" />
          </div>
          {/* Password input */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 p-2 block w-full md:w-1/2 rounded-md border-gray-300" />
          </div>
          {/* Submit button */}
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Create Account</button>
          <div className="mb-4">
            
            <input type="checkbox" id="checkbox" required/>
            <label className="block text-sm font-medium text-gray-700">Creating an account means you're okay with our Terms of Service, Privacy Policy, and out default Notification Settings </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
