var express = require('express');
var time_controller = require('./controllers/time_controller.js');
var app = express();

app.set('view engine', 'ejs');

app.use(express.static('./public'));

time_controller(app);

app.listen(5000);
console.log('You are listening to the port 5000');