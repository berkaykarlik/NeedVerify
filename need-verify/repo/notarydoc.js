const NotaryDoc = require("../models/notarydoc");

function getAllDocumentsByUserId (userId) {
    return new Promise(function (resolve, reject) {
        NotaryDoc.find({ userId }).exec(function (err, notarydoc) {
            if (err) {
                return reject(err);
            }
            if (!notarydoc) {
                return reject('Notary Document is not found');
            }
            resolve(notarydoc);
        });
    });
}

exports.getAllDocumentsByUserId = getAllDocumentsByUserId;