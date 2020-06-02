const express = require('express');
const mongoose = require('mongoose');
const app = express();

const cors = require('cors');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Add the connection string to the .env file
require('dotenv').config();

// Connection to mongodb
const uri = process.env.ATLAS_URI;
const connection = mongoose.connection;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

// Schemas User and Bookings
const userRouter = require('./routes/users');
const bookingRouter = require('./routes/booking');

app.use('/users', userRouter);
app.use('/bookings', bookingRouter);

// Listen to server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});