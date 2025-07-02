import fs from "fs";

let logCounter = 1;

function middleware(filename) {
  return (req, res, next) => {
    const log = `${logCounter++} Server received request: ${req.method} ${
      req.url
    } at ${new Date().toString()}\n`;

    fs.appendFile(filename, log, (err) => {
      if (err) {
        console.error("Error writing to log file:", err.message);
      }
    });

    next();
  };
}

export default middleware;
