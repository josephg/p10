const browserify = require('browserify-middleware');
const express = require('express');
const app = express();

app.get('/bundle.js', browserify(__dirname + '/client.js'));
app.use(express.static(__dirname + '/public'));
app.get('*', (req, res) => res.sendFile(__dirname + '/public/index.html'));

require('http').createServer(app).listen(8888);
console.log('listening on localhost:8888');

