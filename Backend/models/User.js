//Defined a model
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String, // Assuming you're storing plain text passwords, consider hashing them for security
      required: true
    }
  });

  

const User = mongoose.model('User', userSchema);

module.exports = User;