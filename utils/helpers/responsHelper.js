exports.successResponse = (data, massage, statusCode = 200) => {
  return {
    success: true,
    massage,
    statusCode,
    data,
  };
};

exports.errorResponse = (massage, statusCode = 500) => {
  return {
    success: false,
    statusCode,
    error: {
      code: statusCode,
      massage: massage,
    },
  };
};

exports.loginSuccessResponse = (data, massage, token, statusCode = 200) => {
  return {
    success: true,
    massage,
    statusCode,
    data,
    token,
  };
};
