const mongoose = require("mongoose");
const express = require("express");
const authRouter = require("./routes/users");
const rateLimit = require("express-rate-limit");
const helemt = require("helmet");
const mongoSnatize = require("express-mongo-sanitize");
const xssClean = require("xss-clean");
const hpp = require("hpp");
require("dotenv").config();

const app = express();
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too Many Request, Fuak Off Man!",
});

app.use(helemt());
app.use(mongoSnatize());
app.use(xssClean());
app.use(hpp());

app.use("/api", limiter);
app.use(
  express.json({
    limit: "10kb",
  })
);
app.use("/api/v1/users", authRouter);

// const port = process.env.PORT || 8080;
// jUlTNpeCwjXWC8dh

mongoose.connect(
  process.env.mongodb_url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  () => {
    console.log("MongoDB database connection established successfully");
  }
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listing on port ${port}`);
});
