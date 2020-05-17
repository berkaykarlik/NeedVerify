const notarydocRepo  = require("../repo/notarydoc");
const apiHelper = require("../shared/util/api_helper");

function createNotaryDoc(req, res) {
    // Read only allowed params - filter out the rest
    const ownerId = req.body.ownerId;
    const docType = req.body.docType;
    const participantIds = req.body.participantIds;

    // Validate request params
    if (!ownerId || !docType || !participantIds ) {
        return apiHelper.handleErrorResponse(res, { code : apiHelper.httpStatusCodes.BAD_REQUEST });
    }

    // Create document
    return notarydocRepo.createNotaryDoc({ ownerId, docType, participantIds })
        .then(notarydoc => {
            return apiHelper.handleSuccessResponse(res, notarydoc);
        })
        .catch(err => {
            return apiHelper.handleErrorResponse(res, err);
        });
}

exports.createNotaryDoc = createNotaryDoc;