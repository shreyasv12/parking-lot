const http = require('http');

const config = require('./config/config');

const { app } = require('./app');

const server = http.createServer(app);

server.listen(config.port, () => {
  console.log('SERVER LISTENING AT : ', config.port);
});
