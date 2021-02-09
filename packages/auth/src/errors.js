const ERROR = {
  code: {
    unauthorized: 401,
    invalidToken: 401,
    forbidden: 403
  },
  message: {
    unauthorized: 'Unauthorized',
    invalidToken: 'Invalid or expired token',
    forbidden: 'Forbidden'
  }
};

module.exports = {
  error: ERROR,
  getError(error) {
    return {
      code: ERROR.code[error],
      message: ERROR.message[error]
    };
  }
};
