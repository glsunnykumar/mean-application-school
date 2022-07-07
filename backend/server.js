const debug = require('debug')('node-angular');
const http = require('http');
const app = require('./app');

const normalizePort = val => {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof addr === "string" ? "pipe" + addr : "port" + port;

  switch (error.code) {
    case "EACCESS":
      console.error(bind + "require elivagated priviledges");
      process.exit(1);
      break;

    case "EADDRINUSE":
      console.error(bind + "is alreafy in use");
      process.exit(1);
      break;
    default:
      throw error;

  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe" + addr : "port" + port;
  debug(" listening on" + bind);
}
const port = normalizePort(process.env.PORT || 3000);
app.set('port', port);


const server = http.createServer(app)
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);