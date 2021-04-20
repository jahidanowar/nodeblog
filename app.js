const express = require("express");
const mongoose = require("mongoose");
const app = express();

const errorController = require("./controllers/errorController");

//Import Route files
const postRoute = require("./routes/postRoute");
const AppError = require("./utils/appError");

/**
 * Establish Database connection
 */
// Adding password to mongodb uri
const mogodbUri = process.env.MONGODB_URL.replace(
  "<password>",
  process.env.MONGODB_PASSWORD
);
// Connecting to database
(async () => {
  try {
    await mongoose.connect(mogodbUri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log(`Database connection established!`);
  } catch (error) {
    console.log(error);
    console.log(`Unable to establish database connection`);
  }
})();

/**
 *  JSON Inbuilt Middleware
 */
app.use(express.json());

/**
 * All Route registers
 */
app.use("/api/post/", postRoute);

/**
 * Send 404 for undefined routes
 */
app.all("*", (req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} not defined`, 404));
});

app.use(errorController);

module.exports = app;
