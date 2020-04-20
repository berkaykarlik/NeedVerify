"use strict";

const httpStatusCodes = require('./http');

const API_VERSION = "1.0";

const DEFAULT_SUCCESS_CODE = httpStatusCodes.OK;
const DEFUALT_ERROR_CODE = httpStatusCodes.INTERNAL_SERVER_ERROR;

function handleSuccessResponse(res, data = {}, code = DEFAULT_SUCCESS_CODE) {
  const response = {
    "apiVersion": API_VERSION,
    data
  };

  return res.status(code).send(JSON.stringify(response));
}

function handleErrorResponse(res, errors = [{}]) {
  const response = { "apiVersion" : API_VERSION };
  if (!Array.isArray(errors)) {
    errors = [errors];
  }

  const code = (errors[0] && errors[0].code
    ? errors[0].code
    : DEFUALT_ERROR_CODE);

  const errorMessageIfErrorHasAMessage = (errors[0] && errors[0].message)
    ? errors[0].message
    : "";

  const errorMessageIfErrorIsTheMessage = (typeof errors[0] === 'string' ||
    errors[0] instanceof String) ? errors[0] : "";


  const message = errorMessageIfErrorHasAMessage
    ? errorMessageIfErrorHasAMessage
    :
    errorMessageIfErrorIsTheMessage
      ? errorMessageIfErrorIsTheMessage
      : httpStatusCodes.getStatusText(code);

  response.error = { code, message, errors };

  return res.status(response.error.code).send(JSON.stringify(response));
}

exports.handleErrorResponse = handleErrorResponse;
exports.handleSuccessResponse = handleSuccessResponse;
