const mongoose = require("mongoose");
const express = require("express");
const authRouter = require("./routes/users");
require("dotenv").config();

const app = express();
app.use(express.json());

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
