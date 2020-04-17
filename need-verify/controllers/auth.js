

function register(req, res) {
  // Read only allowed params - filter out the rest
  const params = {
    email: req.body.email,
    password: req.body.password,
  };

  // Validate request params
  /*
  return accountRequestValidation.validateNewAccountRequestParams(params)
    // Create account
    .then(() => {
      // return
    })
    .catch(err => {
      // return
    });
*/
}

exports.register = register;