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
var Locale = sequelize.import(__dirname + "/models/locale")
var Picture = sequelize.import(__dirname + "/models/picture")
var Review = sequelize.import(__dirname + "/models/review")
var Adventure = sequelize.import(__dirname + "/models/adventure")

var app = express();
var oneDay = 86400000;

app.use(express.cookieParser());
app.use(express.session({secret: '1234567890QWERTY'}));

app.use(express.compress());
app.use(express.static(__dirname + '/public', {maxAge: oneDay}));
app.use(express.bodyParser());
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.get('/', function (req, res){
    res.render('index.ejs')
});

app.get('/login', function (req, res){
	res.render('login.ejs');
})

app.get('/signup', function (req, res){
	res.render('signup.ejs');
})

app.get('/maps', function (req, res){
	user = req.session.user;
	res.render('maps.ejs', user);
})

app.get('/user/:user_id', function(req, res){

})

app.get('/testAdventure', function(req, res){
	sequelize.query("SELECT * FROM locations").success(function(myTableRows) {
  	console.log(myTableRows);
  	res.send(myTableRows);
	})
})

app.get('/oneAdventure', function(req, res){
	sequelize.query("SELECT * FROM adventures LIMIT 1").success(function(myTableRows) {
  	console.log(myTableRows);
  	res.send(myTableRows);
	})
})

app.get('/api/adventures', function (req, res){
	sequelize.query("SELECT * FROM adventures").success(function(myTableRows) {
  	console.log(myTableRows);
  	res.send(myTableRows);
	})
})

app.get('/api/adventures/time/:time/money/:money', function (req, res){
	sequelize.query("SELECT * FROM adventures WHERE total_time_cost < '" + req.params.time + "' AND total_monetary_cost < " + req.params.money).success(function (myTableRows){
		console.log(myTableRows);
		res.send(myTableRows);
	})
})

app.get('/api/adventure/:adventure_id', function(req, res){
	sequelize.query("SELECT * FROM locations WHERE l_id IN (1, 2, 3, 4, 5, 6)").success(function(myTableRows) {
  	console.log(myTableRows);
  	res.send(myTableRows);
	})
});

app.get('/userlist', function(req, res){
	User.findAll().success(function(users){
		res.render('userList.ejs', {users: users});
	})
})

app.post('/api/login', function(req, res){
	User.find({where: {email: req.body.email, password: req.body.password}}).success(function(user){
		if(!user){
			res.render('badLogin.ejs');
		} else {
			req.session.user = user;
			res.redirect('/maps');
		}
	})
})

app.get('/api/users', function(req, res){
	User.findAll().success(function(users){
		//console.log(users);
		res.send(users);
	})
});

app.post('/api/users', function(req, res){
	User
		.create({name: req.body.name, email: req.body.email, password: req.body.password, sex: req.body.sex})
		.success(function(user, created){
			if(user.values){
				console.log(user.values)
			}
    	console.log(created)
		})
	res.redirect('/map');
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
