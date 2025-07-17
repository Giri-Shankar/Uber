const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();

const connectToDB = require('./db/db');
connectToDB();

const userRoutes = require('./routes/user.route');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});


module.exports = app;