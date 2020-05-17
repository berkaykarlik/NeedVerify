const NotaryDoc = require("../models/notarydoc");

function createNotaryDoc({ username, email, password, firstName, lastName, type }) {
    return new Promise(function(resolve, reject) {
        const notarydoc = new NotaryDoc();
        notarydoc.ownerId = ownerId;
        notarydoc.docType = docType;
        notarydoc.participantIds = participantIds;
        notarydoc.createdAt = new Date();
        notarydoc.updatedAt =  notarydoc.createdAt;
        notarydoc.save(function(err, notarydoc) {
            if (err) {
                logger.error("[createNotaryDoc] while creating notarydoc:" + err);
                return reject(err);
            }
            resolve(notarydoc);
        });
    });
}

exports.createNotaryDoc = createNotaryDoc;