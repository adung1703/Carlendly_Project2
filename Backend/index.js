
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const registerRoute = require('./routes/register.js');
const siginRoute = require('./routes/signin.js');
const managerRoute = require('./routes/manage.js')
const getUserInfo = require('./routes/getUser.js')

const cors = require('cors');
const DB_URI = 'mongodb+srv://adung1703:Adung_2003@project2.8aaaent.mongodb.net/?retryWrites=true&w=majority&appName=Project2';
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const mongoose = require("mongoose");

mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connection successful...");
  })
  .catch((err) => {
    console.log("MongoDB connection failed", err.message);
  })

app.use(express.static(path.join(__dirname)));
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/register', registerRoute);
app.use('/login', siginRoute);
app.use('/import', managerRoute);
app.use('/api/users', getUserInfo);

// Khởi động server
app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
