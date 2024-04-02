
//calls the mongoose module
const mongoose = require('mongoose');
const express = require('express');
const User = require('./models/User');

//middleware for connection
const app = express();
app.use(express.json());

//connection to mongoose
mongoose.connect('mongodb+srv://sagardebnath1001:FT9OBTvqVo034IzJ@user-auth.vqtjenf.mongodb.net/?retryWrites=true&w=majority&appName=user-auth', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));



// Endpoint to create a new user
app.post('/api/users', async (req, res) => {
  try {
    // Create a new user object using the data from the request body
    const newUser = new User(req.body);
    // Save the user object to the database
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

