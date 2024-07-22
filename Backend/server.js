const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

const userRoute = require('./userRoutes/users');

const Users = require('./Models/userModel');

const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const db = mongoose.connect('mongodb+srv://shivakavali:shiva1112@cluster0.dzxbeot.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

app.use('/user', userRoute);

app.listen(PORT, ()=>{console.log(`Server is running on port ${PORT}`)});