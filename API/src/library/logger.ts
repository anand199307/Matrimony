const { createLogger, format, transports, winston } = require('winston');
// require('winston-daily-rotate-file');

// LOG LEVELS
// const levels = {
//   error: 0,
//   warn: 1,
//   info: 2,
//   http: 3,
//   verbose: 4,
//   debug: 5,
//   silly: 6
// };

// DailyRotateFile func()
// Remove the logs from server.log file after 7 days

// const fileRotateTransport = new transports.DailyRotateFile({
//   filename: "logs/server.log",
//   maxFiles: "7d",
// });

const formatOptions = {
  format: format.combine(
    format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
    format.align(),
    format.printf((info: any) => `${[info.timestamp]} ${[info.level.toUpperCase()]}: ${info.message}`),
    format.colorize()
  )
};

const logger = createLogger({
  transports: new transports.File({
    filename: 'logs/server.log',
    format: formatOptions.format
  })
});

if (process.env.ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: formatOptions.format
    })
  );
}

export default logger;
