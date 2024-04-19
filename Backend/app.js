require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const User = require('./models/User');
const cors = require('cors');
const url = require('url');

const app = express();

const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const ProfileRoutes = require('./routes/CloudinaryProfileRoutes');


const fetch = require('node-fetch');


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

// Use the routes from CloudinaryProfileRoutes.js
app.use('/api', ProfileRoutes);


// Function to extract email from URL
function getEmailFromUrl(req) {
  const queryObject = url.parse(req.url,true).query;
  return queryObject.email || null;
}
// Route to handle the verification request from the finish page
app.get('/verify', async (req, res) => {
  const email = getEmailFromUrl(req); // Extract email from the URL

  if (!email) {
    return res.status(400).json({ success: false, error: 'Email not provided' });
  }

  try {
    const result = await sendVerificationEmail(email);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error sending verification email:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});
async function sendVerificationEmail(email) {
  const apiKey = process.env.RESEND_API_KEY;
   
  const url = 'https://api.resend.com/emails';
    const body = {
      
      from: 'Acme <onboarding@resend.dev>',
      to: email,
      subject: 'Email Verification',
      html: `<p>Click <a href="http://localhost:3000/verify">here</a> to verify your email address.</p>`,
      
    };
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(body),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        console.error('Error sending email:', data);
        return { success: false, error: data };
      }
  
      console.log('Email sent successfully:', data);
      return { success: true, data };
    } catch (error) {
      console.error('Error sending email:', error);
      return { success: false, error };
    }
  }

app.post('/api/send-verification-email', async (req, res) => {
  const { email } = req.body;

  try {
    const result = await sendVerificationEmail(email);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error sending verification email:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

