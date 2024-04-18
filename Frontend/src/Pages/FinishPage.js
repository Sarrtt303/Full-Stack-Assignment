import React, { useState } from 'react';
import share from "../assets/share.jpg";
import hire from "../assets/hire.jpg";
import inspo from "../assets/inspo.jpg";
import axios from "axios";
import { useNavigate, useLocation } from 'react-router-dom';

const Card = ({ imageSrc,description, isChecked, onChange, content }) => {
  return (
    <div
      className={`flex flex-col items-center mr-4 md:scale-140 rounded-lg border-4 transition-colors duration-300 ${
        isChecked ? 'border-sky-400' : 'border-gray-300'
      }`}
    >
      <img
        src={imageSrc}
        alt={description}
        className="w-full h-40 object-cover mb-2"
      />
      <p className="mb-2">{description}</p>
      <div className={`${isChecked ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
        <p>{content}</p>
      </div>
      <input type="checkbox" checked={isChecked} onChange={onChange} />
      
    </div>
  );
};

const FinishPage = () => {
  const [isChecked, setIsChecked] = useState([false,false,false]);
  const navigate = useNavigate(); 
  const locationData = useLocation();
  // Extract the email parameter from the URL
  const email = new URLSearchParams(locationData.search).get('email');



  const handleCheckboxChange = (index) => {
    const updatedChecked = [...isChecked];
    updatedChecked[index]= !updatedChecked[index];
    setIsChecked(updatedChecked);
  };

  const handleFinishButtonClick = async() => {
    if (isChecked.some((checked) => checked)) {
      try {
        // Send verification email for the user's email
        const response = await axios.post('http://localhost:5000/api/send-verification-email', {
          email // Replace with the user's email
        });
        console.log(response.data); // Log the response from the server
        navigate('/verify?email=' + encodeURIComponent(email));//Redirects user to verification page
      } catch (error) {
        console.error('Error sending verification email:', error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <h1 className="mb-8 text-4xl md:text-6xl">What brings you to us?</h1>
      <div className="flex justify-between w-1/3 ">
       <div className="group relative">
        <Card
          imageSrc={hire}
          description="Hire developers"
          isChecked={isChecked[1]}
          onChange={() => handleCheckboxChange(1)}
          className="transition-colors duration-300 group-hover:border-blue-500"
          content="I am an employer who wants to hire people for my company"
        />
        
       </div>
       <div className="group">
        <Card
          imageSrc={share}
          description="Share your Stories"
          isChecked={isChecked[0]}
          onChange={() => handleCheckboxChange(0)}
          className="transition-colors duration-300 group-hover:border-blue-500"
          content="I want to share my knowledge with the community"
          
        />
        </div>
        <div className="group">
        <Card
          imageSrc={inspo}
          description="Get insipiration from devs"
          isChecked={isChecked[2]}
          onChange={() => handleCheckboxChange(2)}
          className="transition-colors duration-300 group-hover:border-blue-500"
          content="I want to see how professionals work and lrean best practices"
        />
       </div>
      </div>
      <button onClick={handleFinishButtonClick} disabled={!isChecked} className="mt-8 px-8 py-2 bg-sky-400 text-white rounded-md md:text-lg md:px-12 md:py-4" >
        Finish
      </button>
    </div>
  );
};

export default FinishPage;
