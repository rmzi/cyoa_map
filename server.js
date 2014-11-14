// Scout Ventures Mail + Utility Server
// Author: Ramzi Abdoch

// TODO
// ----
// Log all e-mails

var express = require("express")
var nodemailer = require("nodemailer")

var app = express();
var oneDay = 86400000;

var smtpTransport = nodemailer.createTransport("SMTP",{
   service: "Gmail",
   auth: {
       user: "deals@scoutventures.com",
       pass: "ScoutVentures"
   }
});

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
