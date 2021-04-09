const express = require("express");
const app = express();

// Middleware utilities
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

// Mongoose
const mongoose = require("mongoose");

// Config variables
require("dotenv").config();
const { MONGOURI } = process.env;

//Connecting to the database
mongoose.promise = global.Promise;
mongoose.connect(
  MONGOURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  (err, db) => {
    if (err) console.log(err);
    else console.log("Database Connected...");
  }
);

// Getting data in json format
app.use(bodyParser.json());

// CORS
app.use(cors());

// Dev Middleware
app.use(morgan("dev"));

// Mounting the routes
app.use("/api", require("./routes/index"));

// Serve Static Assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

// Starting the server
const PORT = process.env.PORT || 5055;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
