exports.successResponse = (res, message, data) => {
  res.status(200).json({ message, data });
};

exports.errorResponse = (res, message) => {
  res.status(500).json({ message });
};
