'use strict';
const mongoose = require('mongoose');

const DiplomaSchema = mongoose.Schema({
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    schoolName: { type: String, required: true, lowercase: true },
    facultyName: { type: String,  required: true, lowercase: true },
    departmentName: { type: String, required: true, lowercase: true },
    yearOfGrad: { type: Number, required: true },
    createdAt: Date,
    updatedAt: Date,
});

module.exports = mongoose.model('Diploma', DiplomaSchema);