import React from 'react';

const ImageUpload = ({ onImageUpload }) => {
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            onImageUpload(reader.result);
        };
    };

    return (
        <div>
            <label htmlFor="profileImage">Upload Profile Image:</label>
            <input type="file" id="profileImage" accept="image/*" onChange={handleImageChange} />
        </div>
    );
};

export default ImageUpload;
