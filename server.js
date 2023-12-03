// Import required packages
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config(); // Load environment variables from .env file
const cors = require('cors');

// Create an Express.js app
const app = express();
const port = process.env.PORT || 3000; // Use the provided PORT or default to 3000

// Initialize Supabase client with environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Define a route to fetch images from Supabase
app.get('/fetch-images', async (req, res) => {
  try {
    // Replace 'port_images' with your specific storage directory
    const { data, error } = await supabase.storage.from('port_images').list();
    console.log(data);
    if (error) {
      throw error;
    }

    res.json(data);
  } catch (error) {
    console.error('Error fetching images:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Replace '*' with your desired origin
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// Enable CORS for all origins
app.use(cors());

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
