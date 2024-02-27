module.exports = (err, req, res, next) => {
  console.error(err.stack);

  // You can customize the response based on the error type
  res.status(500).json({
    success: false,
    error: "Internal Server Error",
    message: err.message,
  });
};
