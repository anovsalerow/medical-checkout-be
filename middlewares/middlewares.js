


export const errorHandling = (err, req, res, next) => {
  res.status(err.statusCode || 500).json({"error": err.message});
  next();
};