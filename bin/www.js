const http = require('http');
const app = require('../app');

const port = process.env.PORT || 3007;


app.set('port', port);
let server = http.createServer(app);

console.log('PORT IS', port);

server.listen(port);
server.timeout = 500000;

module.exports = server;

