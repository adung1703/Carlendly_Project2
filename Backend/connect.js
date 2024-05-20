const DB_URI = 'mongodb+srv://adung1703:Adung_2003@project2.8aaaent.mongodb.net/?retryWrites=true&w=majority&appName=Project2';
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

  