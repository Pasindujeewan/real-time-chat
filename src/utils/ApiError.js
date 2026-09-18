class ApiError extends Error {
  constructor(message, statusCode, error_code) {
    super(message);
    this.statusCode = statusCode;
    this.error_code = error_code;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
