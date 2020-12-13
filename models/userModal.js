const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide a name!"],
    min: [3, "your name can not be less than 3 letters!"],
    max: [50, "your name can not be more than 50 letters!"],
  },

  email: {
    type: String,
    required: [true, "please provide an email!"],
    unique: true,
    lowercase: true,
    // validate: [validator.isEmail, "please provide a valid email!"],
  },

  password: {
    type: String,
    required: [true, "please provide a password!"],
    min: [3, "your password can not be less than 3 letters!"],
    max: [50, "your password can not be more than 50 letters!"],
  },

  passwordConfirm: {
    type: String,
    required: [true, "please provide a password confirm!"],
    min: [3, "your name can not be less than 3 letters!"],
    max: [50, "your name can not be more than 50 letters!"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "passwords must be the same!",
    },
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;

  next();
});

const User = mongoose.model("User", userSchema);

module.exports.User = User;
