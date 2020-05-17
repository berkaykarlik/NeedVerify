'use strict';
const mongoose = require('mongoose');

const CertificateSchema = mongoose.Schema({
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    certificateName: { type: String, required: true, lowercase: true },
    institutionName: { type: String, required: true, lowercase: true },
    issueDate: { type: Date, required: true },
    periodOfValidity: { type: Number, required: true },
    createdAt: Date,
    updatedAt: Date,
});

module.exports = mongoose.model('Certificate', CertificateSchema);