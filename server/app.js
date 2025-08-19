const express = require('express');
const path = require('path');
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors({
  origin: "http://localhost:3000", // your frontend URL
  credentials: true,               // allow cookies
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.get('/', (req, res) => {
    res.send('API is running 🚀');
});

app.use('/signup', require('./src/routes/user/signup.js'));
app.use('/login', require('./src/routes/user/login.js'));
app.use('/delete', require('./src/routes/user/delete.js'))
app.use('/scan', require('./src/routes/scan/scan.js'))

module.exports = app