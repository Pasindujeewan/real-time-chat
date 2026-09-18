// Error handling middleware
const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const error_code = err.error_code || "INTERNAL_SERVER_ERROR";
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    error_code,
    message,
  });
};

export default errorMiddleware;
