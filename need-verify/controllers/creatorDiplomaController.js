const accountRepo = require("../../../NeedVerify/need-verify/repo/account");
const apiHelper = require("../../../NeedVerify/need-verify/shared/util/api_helper");
const creatorDiplomaRepo = require("../repo/createdDiplomas");

function getAllDiplomasByCreatorId(req, res) {
    const creatorId = req.query['creator_id'];

    // Validate request params
    if (!creatorId) {
        return apiHelper.handleErrorResponse(res, { code : apiHelper.httpStatusCodes.BAD_REQUEST });
    }

    // Get Account
    return accountRepo.getAccountWithCreatorId({ creatorId })
        .then(account => {
            if(!account) {
                return apiHelper.handleErrorResponse(res, { code : apiHelper.httpStatusCodes.BAD_REQUEST });
            }
            if (account._id != creatorId) {
                return apiHelper.handleErrorResponse(res, { code : apiHelper.httpStatusCodes.UNAUTHORIZED });
            }
            return creatorDiplomaRepo.getAllDiplomasByCreatorId(creatorId)
        })
        .then(diplomas => {
            return apiHelper.handleSuccessResponse(res, diplomas);
        })
        .catch(err => {
            return apiHelper.handleErrorResponse(res, err);
        });
}

exports.getAllDiplomasByCreatorId = getAllDiplomasByCreatorId;

