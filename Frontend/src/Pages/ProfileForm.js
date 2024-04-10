import React, { useState } from 'react';
import ImageUpload from '../components/ImageUpload';
import LocationInput from '../components/LocationInput';


const ProfileForm = ({ username }) => {
    const [profileImage, setProfileImage] = useState(null);
    const [location, setLocation] = useState('');
   

    const handleImageUpload = (image) => {
        setProfileImage(image);
    };

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        // Send profile data (username, profileImage, location) to the API
        const formData = new FormData();

        formData.append('username', username);
        formData.append('profileImage', profileImage);
        formData.append('location', location);

        try{
            const response= await fetch('http://localhost:5000/profiles',{
                  method:'POST',
                  body: formData
            });

            if(!response.ok){
                throw new Error('Failed to create profile')
            }
                
        }catch(error){
            console.log("Error creating profile:",error);
        }
        
    };   

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center h-screen">
        <div className="max-w-xs mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-xl mb-4">Create Profile</h2>
            <p className="mb-4">Username: {username}</p>
            <div className="mb-4">
            <ImageUpload onImageUpload={handleImageUpload} />
            </div>
            <div className="mb-4">
            <LocationInput value={location} onChange={handleLocationChange} />
            </div>
            <button type="submit" className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full' >Create Profile</button>
            </div>
        </form>
    );
};

export default ProfileForm;
