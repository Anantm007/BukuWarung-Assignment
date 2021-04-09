const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// User Schema
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    credits: {
      type: Number,
      required: true,
    },
    avatar: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// Exporting the schema
const User = mongoose.model("User", UserSchema);

module.exports = User;
