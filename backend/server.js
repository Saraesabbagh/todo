const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { readdirSync } = require("fs");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Load routes dynamically from the "routes" folder
readdirSync("./routes").forEach((file) => {
  const route = require(`./routes/${file}`);
  if (typeof route === "function") {
    // Ensure that the imported route is a valid middleware function
    app.use("/", route);
  } else {
    console.error(`Invalid middleware in file: ${file}`);
  }
});

// Database connection
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true, // Add this for MongoDB 5.x
  })
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error('Error connecting to MongoDB', err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB database');
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});


