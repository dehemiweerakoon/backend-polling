const winston = require("winston");
module.exports = function (ex) {
  // logger.error(err.message,err);
  const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    transports: [
      new winston.transports.File({ filename: "error.log", level: "warn" }),
    ],
  });
  logger.error(ex.message, ex);
};
