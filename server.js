// COMSW4111 - Intro to Databases 
// Final Project - Choose Your Own Adventure Map
// Author: Ramzi Abdoch

// TODO
// ----
// - Write API
// - Connect to MySQL server

var express = require("express")
var mysql = require("mysql")

var Sequelize = require('sequelize')
  , sequelize = new Sequelize('cs4111', 'raa2148', 'columbiauni', {
      host: 'cs4111.cuas5d9zztij.us-west-2.rds.amazonaws.com',
      dialect: "mysql", // or 'sqlite', 'postgres', 'mariadb'
      port:    3306, // or 5432 (for postgres)
    })
 
sequelize
  .authenticate()
  .complete(function(err) {
    if (!!err) {
      console.log('Unable to connect to the database:', err)
    } else {
      console.log('Connection has been established successfully.')
    }
  })

var User = sequelize.import(__dirname + "/models/user")

var app = express();
var oneDay = 86400000;

app.use(express.compress());
app.use(express.static(__dirname + '/public', {maxAge: oneDay}));
app.use(express.bodyParser());
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.get('/', function (req, res){
    res.render('index.html');
});

app.get('/createUser', function(req, res){
		res.render('createUser.html')
})

app.get('/api/users', function(req, res){

});

app.post('/api/users', function(req, res){
	console.log(req.body);
	res.redirect('/');
})

app.get('/sync', function(req, res){
	sequelize
  .sync({ force: true })
  .complete(function(err) {
     if (!!err) {
       console.log('An error occurred while creating the table:', err)
     } else {
       console.log('It worked!')
       res.send({msg:"sweet!"})
     }
  });
})

var port = process.env.PORT || 4200;

app.listen(port, function() {
  console.log("Listening on " + port);
});
