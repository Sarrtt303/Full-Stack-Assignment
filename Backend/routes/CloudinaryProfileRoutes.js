// routes/profileRoutes.js
const express = require('express');
const router = express.Router();
const CloudinaryProfile = require('../models/CloudinaryProfileSchema');

// Middleware to parse incoming form data
router.use(express.urlencoded({ extended: true }));

router.post('/cloudinaryProfiles', async (req, res) => {
  try {
    // Extract data from request body
    const { location, imageUrl } = req.body;

    // Create a new profile document
    const newProfile = new CloudinaryProfile({
      imageUrl,
      location
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