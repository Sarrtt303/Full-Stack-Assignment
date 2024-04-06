import React, { useState } from 'react';
import ImageUpload from './ImageUpload';
import LocationInput from './LocationInput';

const ProfileForm = ({ username }) => {
    const [profileImage, setProfileImage] = useState(null);
    const [location, setLocation] = useState('');

    const handleImageUpload = (image) => {
        setProfileImage(image);
    };

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send profile data (username, profileImage, location) to the API
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Profile</h2>
            <p>Username: {username}</p>
            <ImageUpload onImageUpload={handleImageUpload} />
            <LocationInput value={location} onChange={handleLocationChange} />
            <button type="submit">Create Profile</button>
        </form>
    );
};

export default ProfileForm;
