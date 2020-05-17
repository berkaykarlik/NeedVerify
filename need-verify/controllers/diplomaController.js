const accountRepo = require("../repo/account");
const apiHelper = require("../shared/util/api_helper");
const diplomaRepo = require("../repo/diploma");

function getAllDiplomasByUserId(req, res) {
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
            return diplomaRepo.getAllDiplomasByUserId(userId)
        })
        .then(diplomas => {
            return apiHelper.handleSuccessResponse(res, diplomas);
        })
        .catch(err => {
            return apiHelper.handleErrorResponse(res, err);
        });
}

exports.getAllDiplomasByUserId = getAllDiplomasByUserId;