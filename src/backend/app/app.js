const path = require('path');
const http = require('http');
const express = require('express');

const app = express();
app.use(express.static(path.join(__dirname, '/build')));

app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname + '/build/index.html'));
});
const httpServer = http.createServer(app);
httpServer.listen(80);
console.log('Server started!');