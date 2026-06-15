function notFound(req, res) {
  res.status(404).json({
    message: `Route ${req.method} ${req.originalUrl} tidak ditemukan`
  });
}

function errorHandler(error, req, res, next) {
  // Log detailed technical error to terminal/Vercel console
  console.error("Internal Server Error:", error);

  const statusCode = error.statusCode || 500;
  
  // If it's a 500 error (system/database issue), hide raw error details from client
  let clientMessage = error.message;
  if (statusCode === 500) {
    clientMessage = "Terjadi kesalahan pada server. Silakan coba beberapa saat lagi.";
  }

  res.status(statusCode).json({
    message: clientMessage || "Terjadi kesalahan pada server"
  });
}

module.exports = {
  notFound,
  errorHandler
};
