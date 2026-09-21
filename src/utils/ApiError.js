export class ApiError extends Error {
  constructor(message, statusCode = 500, error_code = "INTERNAL_SERVER_ERROR") {
    super(message);
    this.statusCode = statusCode;
    this.error_code = error_code;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
