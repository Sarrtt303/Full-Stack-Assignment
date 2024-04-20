const express = require('express');
const router = express.Router();
const Profile = require('../models/CloudinaryProfileSchema');

// Route to handle updating profile location and email
router.post('/profiles', async (req, res) => {
  try {
    const { email, location } = req.body;

    // Create a new profile document
    const newProfile = new Profile({
      email: email,
      location: location
    });

    // Save the updated profile
    await newProfile.save();

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

module.exports = router;
