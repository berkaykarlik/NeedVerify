const accountRepo = require("../repo/account");
const apiHelper = require("../shared/util/api_helper");

function register(req, res) {
  // Read only allowed params - filter out the rest
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const type = req.body.type;

  // Validate request params
  if (!username || !email || !password || !firstName || !lastName || !type) {
    return apiHelper.handleErrorResponse(res, { code : apiHelper.httpStatusCodes.BAD_REQUEST });
  }

  // Create account
  return accountRepo.createAccount({ username, email, password, firstName, lastName, type })
    .then(account => {
      return apiHelper.handleSuccessResponse(res, account);
    })
    .catch(err => {
      return apiHelper.handleErrorResponse(res, err);
    });
}

exports.register = register;