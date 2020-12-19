const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

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

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
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

  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpiresDate: Date,
});

// hash the password before saving it to the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;

  next();
});

// create a custom function top check if the user changes his/her pasword after we provide a json web token for them!
userSchema.methods.changePasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changeTimestasmp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);

    return JWTTimeStamp < changeTimestasmp;
  }

  return false;
};

// create a custom function to create a password rest token using the built in crypto module
userSchema.methods.createPasswordResetToken = function () {
  const token = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto.createHash("sha256").update(token).digest("hex");

  this.passwordResetExpiresDate = Date.now() + 10 * 60 * 1000;

  return token;
};

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) {
    return next();
  }
  this.passwordChangedAt = Date.now();
  next();
});

// create the module for the user schema
const User = mongoose.model("User", userSchema);

module.exports.User = User;
