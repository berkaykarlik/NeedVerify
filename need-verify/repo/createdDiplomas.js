const CreatedDiplomas = require("../models/createdDiplomas");

function getAllDiplomasByCreatorId (creatorId) {
    return new Promise(function (resolve, reject) {
        CreatedDiplomas.find({ creatorId }).exec(function (err, diploma) {
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

exports.getAllDiplomasByCreatorId = getAllDiplomasByCreatorId;