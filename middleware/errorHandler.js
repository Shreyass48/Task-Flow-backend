const { z } = require("zod");

module.exports.errorMiddleware = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  let errors;

  // Zod validation errors
  if (err instanceof z.ZodError) {
    statusCode = 400;
    message = "Validation failed";

    errors = err.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));
  }

  // Invalid MongoDB ObjectId
  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID";
  }

  // Duplicate MongoDB value
  if (err.code === 11000) {
    statusCode = 409;
    message = "Resource already exists";
  }

  return res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors }),
  });
};
