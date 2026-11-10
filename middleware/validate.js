module.exports.validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
    });

    if (!result.success) {
      return next(result.error);
    }

    // Replace request data with validated data
    req.body = result.data.body || req.body;
    req.params = result.data.params || req.params;

    next();
  };
};
