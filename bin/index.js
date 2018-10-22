//const http = require('http');
const app = require('../app')
const PORT = parseInt(process.env.PORT, 10) || 8080;

app.listen(PORT);
