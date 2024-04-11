// routes/profileRoutes.js

const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const upload = require('../helpers/upload');

router.post('/profiles', upload.single('image'), async (req, res) => {
  try {
    // Extract data from request body
    const { location } = req.body;

    // Create a new profile document
    const newProfile = new Profile({
      location,
      image: {
        data: req.file.buffer, // Image data from the buffer
        contentType: req.file.mimetype // Image content type
      }
    });

    // Save the new profile to the database
    await newProfile.save();

    // Respond with success message
    res.status(201).json({ message: 'Profile created successfully', profile: newProfile });
  } catch (error) {
    // If an error occurs, respond with error message
    console.error('Error creating profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
