const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const User = require('./User');


const app = express();
const port = 3000;


// Middleware
app.use(bodyParser.json());
app.use(cors());


// MongoDB connection
const dbURI = 'mongodb+srv://aaradhyajain:YqATEbvcf9ap7gRj@gymniq.1x3cbxk.mongodb.net/?retryWrites=true&w=majority&tls=true';
mongoose.connect(dbURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));


// Basic route
app.get('/', (req, res) => {
  res.send('Hello World!');
});


// Sign-up route
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;


  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword});
    await user.save();
    res.status(201).send('User created successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
});


// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;


  try {
    const user = await User.findOne({ email});
    if (!user) {
      return res.status(400).send('User not found');
    }


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid credentials');
    }


    res.status(200).send('Login successful');
  } catch (error) {
    res.status(400).send(error.message);
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

