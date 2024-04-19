import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const CloudinaryProfileForm = () => {
  const [location, setLocation] = useState('');
  const [imageUrl, setImageUrl] = useState(''); 
  const navigate = useNavigate();
  const locationData = useLocation();
  const email = new URLSearchParams(locationData.search).get('email');

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };
  

  const handleImageUpload = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'dey8jatax',
        uploadPreset: 'profileimage_demo',
        sources: ['local', 'url', 'camera'],
        cropping: true,
        croppingAspectRatio: 1,
        croppingShowDimensions: true,
        maxFileSize: 10000000, // 10MB
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          // Extract the secure URL of the uploaded image from the response object
          const uploadedImageUrl = result.info.secure_url;
          setImageUrl(uploadedImageUrl);
        }
      }
    );

    widget.open();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      
      
      formData.append('location', location);
      formData.append('email', email);
      formData.append('imageUrl', imageUrl);
      
      
      await axios.post('http://localhost:5000/api/profiles', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Profile created successfully!');
      navigate('/finish?email=' + encodeURIComponent(email));
    } catch (error) {
      console.error('Error creating profile:', error);
      alert('Failed to create profile. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {/* Title */}
      <h1 className="text-3xl font-semibold mb-8">Welcome! Let's create a profile</h1>
      {/* Add an Avatar text */}
      <div className="mb-4 text-xl font-large">Add an Avatar</div>
      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-xl w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="flex items-center mb-4">
          {/* Image Upload */}
          <div className="mr-4 mb-16">
            <button
              type="button"
              onClick={handleImageUpload}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Upload Image
            </button>
          </div>
          {/* Image Preview */}
          {imageUrl && (
            <img src={imageUrl} alt="Preview" className="rounded-full w-40 h-40" />
          )}
        </div>
        <div className="mb-4 mt-12">
          <label htmlFor="location" className="block text-gray-700 font-medium mb-2">
            Location:
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={handleLocationChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full"
        >
          Create Profile
        </button>
      </form>
    </div>
  );
};

export default CloudinaryProfileForm;
