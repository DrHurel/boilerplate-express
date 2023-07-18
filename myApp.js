const bodyParser = require('body-parser');
let express = require('express');
let app = express();

//Serve static assets

app.use(function (req, res, next) {
  console.log(req.method + ' ' + req.path + ' - ' + req.ip);
  next();
});

app.use('/public', express.static(__dirname + '/public'));


//GET
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/json', function (req, res) {
  res.json({ "message": "Hello json" });
});

app.get('/now', function (req, res, next) {
  req.time = new Date().toString();
  next();
}, function (req, res) {
  res.json({ "time": req.time });
});

app.get('/:word/echo', function (req, res) {
  res.json({ "echo": req.params.word });
});

app.route('/name')
  .get(function (req, res) {
    res.json({ "name": req.query.first + ' ' + req.query.last });
  })
  .post(function (req, res) {
    res.json({ "name": req.body.first + ' ' + req.body.last });
  });


app.listen(4444, function () {
  console.log('Listening on port 4444');
});


























module.exports = app;
