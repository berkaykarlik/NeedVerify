const accountRepo = require("../repo/account");
const apiHelper = require("../shared/util/api_helper");
const certificateRepo = require("../repo/certificate");

function getAllCertificatesByUserId(req, res) {
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
            return certificateRepo.getAllCertificatesByUserId(userId);
        })
        .then(certificates => {
            return apiHelper.handleSuccessResponse(res, certificates);
        })
        .catch(err => {
            return apiHelper.handleErrorResponse(res, err);
        });
}

exports.getAllCertificatesByUserId = getAllCertificatesByUserId;