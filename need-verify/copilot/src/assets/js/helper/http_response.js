
const HTTP_STATUS_CODE_300 = 300

function isFailedRequestStatus (status) {
  const numericStatusCode = parseInt(status)

  if (isNaN(numericStatusCode)) {
    return new Error('Non numeric status code:' + status);
  }

  return numericStatusCode >= HTTP_STATUS_CODE_300
}

exports.isFailedRequestStatus = isFailedRequestStatus;
