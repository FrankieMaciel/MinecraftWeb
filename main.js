const express = require('express');
const path = require('path');

const app = express();
const port = 3001;

app.use(express.static('views'));
app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.listen(port);
console.log('Server started at http://localhost:' + port);