'use strict';

var express = require('express'),
    app = express(),
    path = require('path'),
    projectRoot = __dirname;
app.use(express.static(projectRoot));

app.get('*', function (req, res) {
  res.sendFile(path.join(projectRoot + '/index.html'));
});

var port = 3009;

console.log('Server up and running on http://localhost:/' + port);
app.listen(port);
