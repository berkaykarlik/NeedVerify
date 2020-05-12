const Account = require("../models/account");
const logger = require('../util/logger');

function createAccount({ username, email, password, firstName, lastName, type }) {
  return new Promise(function(resolve, reject) {
    const account = new Account();
    account.username = username;
    account.email = email;
    account.password = password;
    account.type = type;
    account.firstName = firstName;
    account.lastName = lastName;
    account.createdAt = new Date();
    account.updatedAt = account.createdAt;
    account.save(function(err, account) {
      if (err) {
        logger.error("[createAccount] while creating account:" + err);
        return reject(err);
      }
      resolve(account);
    });
  });
}

function getAccountWithAccountId (accountId) {
  return new Promise(function (resolve, reject) {
    Account.find({ accountId }).exec(function (err, account) {
      if (err) {
        return reject(err);
      }
      if (!account) {
        return reject('Account is not found');
      }
      resolve(account);
    });
  });
}

exports.createAccount = createAccount;
exports.getAccountWithAccountId = getAccountWithAccountId;