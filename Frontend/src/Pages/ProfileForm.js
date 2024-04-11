import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const ProfileForm = () => {
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);
  const navigate= useNavigate()

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('location', location);

      // Send POST request to backend endpoint
      await axios.post('http://localhost:5000/api/profiles', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Profile created successfully!');
      // Reset form fields
      navigate('/finish');
    } catch (error) {
      console.error('Error creating profile:', error);
      alert('Failed to create profile. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={handleLocationChange}
          required
        />
      </div>
      <div>
        <label htmlFor="image">Image:</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
      </div>
      <button type="submit">Create Profile</button>
    </form>
  );
};

export default ProfileForm;
