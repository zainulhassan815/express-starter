export const validateRequest = ({ body, params, query }) => {
  return (req, res, next) => {
    try {
      if (body) req.body = body.parse(req.body);
      if (params) req.params = params.parse(req.params);
      if (query) req.query = query.parse(req.query);
      next();
    } catch (err) {
      if (err.name === "ZodError") {
        const formattedErrors = err.errors.map((e) => ({
          path: e.path.join("."),
          message: e.message,
          type: e.code,
        }));

        return res.status(400).json({
          error: "Validation failed",
          message: `Invalid request data in ${body ? "body" : params ? "params" : "query"}`,
          errors: formattedErrors,
        });
      }
      next(err); // pass unexpected errors
    }
  };
};
