var express = require('express');

var app = express();
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.use(express.logger());

//do database stuff
console.log('****DB URL='+process.env.DATABASE_URL);
var pg = require('pg');
pg.connect(process.env.DATABASE_URL, function(err, client, done) {
  client.query('SELECT * FROM COMPANY', function(err, result) {
    done();
    if(err) return console.error(err);
    console.log('***DATABASE-RESULT***');
    console.log(result.rows);
  });
});

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


