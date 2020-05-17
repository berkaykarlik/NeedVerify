const Certificate = require("../models/certificate");

function getAllCertificatesByUserId (userId) {
    return new Promise(function (resolve, reject) {
        Certificate.find({ userId }).exec(function (err, certificate) {
            if (err) {
                return reject(err);
            }
            if (!certificate) {
                return reject('Certificate is not found');
            }
            resolve(certificate);
        });
    });
}

exports.getAllCertificatesByUserId = getAllCertificatesByUserId();