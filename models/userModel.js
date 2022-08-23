// Importing mongoose and create a schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a schema for the admin
const userSchema = new Schema({
    username: {
        type: String,
        required: true
      },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true
    }
  });

// Create a model for the admin
const User = mongoose.model('users', userSchema);

module.exports = User;