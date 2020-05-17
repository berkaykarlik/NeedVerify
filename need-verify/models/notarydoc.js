'use strict';
const mongoose = require('mongoose');

const NotaryDocSchema = mongoose.Schema({
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    docType: { type: String,  required: true, lowercase: true },
    participantIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdAt: Date,
    updatedAt: Date,
});

module.exports = mongoose.model('NotaryDoc', NotaryDocSchema);