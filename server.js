// COMSW4111 - Intro to Databases 
// Final Project - Choose Your Own Adventure Map
// Author: Ramzi Abdoch

// TODO
// ----
// - Write API
// - Connect to MySQL server

var express = require("express")
var mysql = require("mysql")
var connection;

connection = mysql.createConnection({
  host: "cs4111.cuas5d9zztij.us-west-2.rds.amazonaws.com:3306",
  user: "raa2148",
  password: "columbiauni"
});

connection.connect();

var app = express();
var oneDay = 86400000;

app.use(express.compress());
app.use(express.static(__dirname + '/public', {maxAge: oneDay}));
app.use(express.bodyParser());

app.get('/email', function(req, res){
  //console.log(req.query)  
  name = req.query['sv-cF-name']
  dept = req.query['sv-cF-dept'][1]
  company = req.query['sv-cF-company']
  email = req.query['sv-cF-email']
  message = req.query['sv-cF-message']

  deal = {
    to: "deals@scoutventures.com",
    from: "email",
    subject: dept + " - " + name + " - " + company,
    text: message + "\n\nFrom: " + email,
    html: "<p>" + message + "\n\nFrom: " + email + "</p>"
  }

  smtpTransport.sendMail(deal, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }
  });
});

var port = process.env.PORT || 80;

app.listen(port, function() {
  console.log("Listening on " + port);
});
