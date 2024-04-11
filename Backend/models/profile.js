// profile.model.js
const mongoose = require('mongoose');
const { buffer } = require('stream/consumers');
const Schema = mongoose.Schema;

const profileSchema = new Schema({

    profileImage: {
        type: String,
        required: true
    },
    location: {
        type: String
    }
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
