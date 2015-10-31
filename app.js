var express = require("express");
var bodyParser  = require("body-parser");
var app  = express();

var main = require('./controllers/main');
var iron = require('./controllers/iron');

app.use('/', main);
app.use('/iron', iron);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(3000,function(){
    console.log("All right ! I am alive at Port 3000.");
});