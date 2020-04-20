'use strict';
const mongoose = require('mongoose');

const AccountSchema = mongoose.Schema({
  username: { type: String, unique: true, required: true, lowercase: true },
  email: { type: String, lowercase: true, unique: true },
  password: { type: String,  required: true },
  firstName: { type: String, lowercase: true },
  lastName: { type: String, lowercase: true },
  type: { type: String, enum: ["creator", "user"], lowercase: true },
  createdAt: Date,
  updatedAt: Date,
});

module.exports = mongoose.model('Account', AccountSchema);