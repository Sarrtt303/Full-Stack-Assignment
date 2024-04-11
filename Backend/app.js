
//calls the mongoose module
const mongoose = require('mongoose');
const express = require('express');
const User = require('./models/User');
const cors = require('cors');
const app = express();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const profileRouter = require('./routes/ProfileRoutes');



//middleware for connection
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Parse JSON request bodies

//Middleware for cors
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  credentials: true // Include cookies in CORS requests
}));




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


//Endpoint to authenticate user and handling login requests

app.post('/api/login', async (req, res) => {
  // Extract username and password from the request body
  const { username, password } = req.body;

  try {
    // Find the user by username in the database
    const user = await User.findOne({ username });

    // If the user is not found, return an error response
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the provided password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If the passwords don't match, return an error response
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // If the passwords match, return a success response
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    // If an error occurs, return a server error response
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route for handling profiles
app.use('/api', profileRouter); 

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

