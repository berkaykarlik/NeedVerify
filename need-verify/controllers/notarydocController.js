const accountRepo = require("../repo/account");
const apiHelper = require("../shared/util/api_helper");
const notarydocRepo = require("../repo/notarydoc");

function getAllDocumentsByUserId(req, res) {
    const userId = req.query['user_id'];

    // Validate request params
    if (!userId) {
        return apiHelper.handleErrorResponse(res, { code : apiHelper.httpStatusCodes.BAD_REQUEST });
    }

    // Get Account
    return accountRepo.getAccountWithUserId({ userId })
        .then(account => {
            if(!account) {
                return apiHelper.handleErrorResponse(res, { code : apiHelper.httpStatusCodes.BAD_REQUEST });
            }
            if (account._id != userId) {
                return apiHelper.handleErrorResponse(res, { code : apiHelper.httpStatusCodes.UNAUTHORIZED });
            }
            return notarydocRepo.getAllDocumentsByUserId(userId)
        })
        .then(notarydoc => {
            return apiHelper.handleSuccessResponse(res, notarydoc);
        })
        .catch(err => {
            return apiHelper.handleErrorResponse(res, err);
        });
}

exports.getAllDocumentsByUserId = getAllDocumentsByUserId;