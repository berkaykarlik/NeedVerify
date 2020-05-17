'use strict';
const mongoose = require('mongoose');

const CreatedDiplomaSchema = mongoose.Schema({
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    creatorId: {type: mongoose.Schema.Types.ObjectId, ref: 'Creator'},
    schoolName: { type: String, required: true, lowercase: true },
    facultyName: { type: String,  required: true, lowercase: true },
    departmentName: { type: String, required: true, lowercase: true },
    yearOfGrad: { type: Number, required: true },
    createdAt: Date,
    updatedAt: Date,
});

module.exports = mongoose.model('CreatedDiplomas', CreatedDiplomaSchema);