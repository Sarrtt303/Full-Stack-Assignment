// profile.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
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
