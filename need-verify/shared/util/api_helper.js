const httpStatusCodes = require("./http");
const jsonHelper = require("./json_helper");
const logger = require("../../util/logger");

function handleErrorResponse(res, error) {
  return jsonHelper.handleErrorResponse(res, error);
}

function handleSuccessResponse(res, data, code) {
  return jsonHelper.handleSuccessResponse(res, data, code);
}

exports.handleErrorResponse = handleErrorResponse;
exports.handleSuccessResponse = handleSuccessResponse;
exports.httpStatusCodes = httpStatusCodes;