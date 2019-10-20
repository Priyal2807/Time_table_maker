var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
  extended: false
});
var ejs = require('ejs');
var mongoose = require('mongoose');
var fs = require('fs');
var pdf = require('html-pdf');
var path = require("path");
const conn = mongoose.createConnection('mongodb://localhost/time_table');

var timeSchema = new mongoose.Schema({

  tid: Number,
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
    app.delete('/timeTable/:val', (req, res) => {
      timeT.find({
        tid: req.params.val
      }).deleteOne(function(err, data) {
        if (err) throw err;
        res.json(data);
      })
    })


  });

  app.post('/timeTable', urlencodedParser, (req, res) => {
    var newItem = timeT(req.body).save(function(err, data) {
      if (err)
        throw err;

      res.json(data);
    });

  });

  app.get('/generateTimeTable', (req, res) => {
    timeT.find({}, function(err, data) {
      if (err)
        throw err;

      res.render('timeTable', {
        tt: data
      });
    });
  });

  app.get('/download', (req, res) => {
    timeT.find({}, function(err, data) {
      res.render("timeTable", {
        tt: data
      }, function(err, html) {
        pdf.create(html).toFile('./public/pdf/timeT.pdf', function(err, res) {
          if (err) {
            console.log(err);
          } else {
            console.log(res);
          }
        });

        res.send(html);
      });
    });
    // ejs.renderFile(path.join(__dirname, '../views/', "timeTable.ejs"), (err, data) => {
    //   console.log(data);
    //   if (err) {
    //     //console.log(err);
    //     res.send(err);
    //   } else {
    //
    //     let options = {
    //       "height": "11.25in",
    //       "width": "8.5in",
    //       "header": {
    //         "height": "20mm"
    //       },
    //       "footer": {
    //         "height": "20mm",
    //       },
    //     };
    //     pdf.create(data, options).toFile("./timet.pdf", function(err, data) {
    //       console.log("hello");
    //       if (err) {
    //         res.send(err);
    //       } else {
    //         res.send("File created successfully");
    //       }
    //     });
    //   }
    // });

  });
};