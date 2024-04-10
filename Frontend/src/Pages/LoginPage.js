import React, { useState } from 'react';
import axios from 'axios';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {

      // Make a POST request to your backend server's login endpoint
      const response=await axios.post('http://localhost:5000/api/login', {
        username,
        password
      });
      console.log('Login successful', response.data)
      // Assuming successful login redirects to another page
      // Replace '/dashboard' with the appropriate URL
      window.location.href = '/profile';
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle login error, such as displaying an error message to the user
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="max-w-xs mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl mb-4">Login</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="mt-1 p-2 block w-full rounded-md border-gray-300 bg-gray-200" />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 p-2 block w-full rounded-md border-gray-300 bg-gray-200" />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
