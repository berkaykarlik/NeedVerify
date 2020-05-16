const Diploma = require("../models/diploma");

function getAllDiplomasByUserId (userId) {
    return new Promise(function (resolve, reject) {
        Diploma.find({ userId }).exec(function (err, diploma) {
            if (err) {
                return reject(err);
            }
            if (!diploma) {
                return reject('Diploma is not found');
            }
            resolve(diploma);
        });
    });
}

exports.getAllDiplomasByUserId = getAllDiplomasByUserId;