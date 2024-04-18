const mongoose = require('mongoose');

const CloudinaryprofileSchema = new mongoose.Schema({
  location: { type: String, required: true },
  imageUrl: { type: String, required: true }
}, { collection: 'CloudinaryProfiles' }); // Specify the collection name here

const CloudinaryProfile = mongoose.model('CloudinaryProfiles', CloudinaryprofileSchema);

module.exports = CloudinaryProfile;
