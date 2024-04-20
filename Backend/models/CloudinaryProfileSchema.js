const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  location: { type: String, required: true },
  email: {type: String, required: true},
}); 
const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
