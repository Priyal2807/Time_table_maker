var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
  extended: false
});
var mongoose = require('mongoose');

const conn = mongoose.createConnection('mongodb://localhost/time_table');

var timeSchema = new mongoose.Schema({
  st: String,
  et: String,
  desc: String
});

var timeT = conn.model('timeT', timeSchema);

module.exports = function(app) {
  app.get('/', (req, res) => {
    res.render('home');
  });

  app.get('/timeTable', (req, res) => {

    timeT.find({}, function(err, data) {
      if (err) throw err;

      res.render('makeit', {
        details: data
      }); //this data comes from find method
    });


  });

  app.post('/timeTable', urlencodedParser, (req, res) => {
    var newItem = timeT(req.body).save(function(err, data) {
      if (err)
        throw err;

      console.log("saved item");
      res.json(data);
    });

  });


};