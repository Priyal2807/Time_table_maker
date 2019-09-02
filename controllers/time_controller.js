var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
  extended: false
});
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/time_table', function(err) { // if the db does not exist it will create the database

  if (err) throw err;

  console.log('Successfully connected');

});

module.exports = function(app) {
  app.get('/', (req, res) => {
    res.render('home');
  });

  app.get('/timeTable', (req, res) => {
    res.render('makeit');
  });


};