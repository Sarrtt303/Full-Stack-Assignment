import React from 'react';

const LocationInput = ({ value, onChange }) => {
    return (
        <div>
            <label htmlFor="location">Location:</label>
            <input type="text" id="location" value={value} onChange={onChange} />
        </div>
    );
};

export default LocationInput;
