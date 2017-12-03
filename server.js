var express = require("express");
var app = express();
var fileUpload = require("express-fileupload");

var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var jwt    = require('jsonwebtoken');
var config = require('./config');
var User   = require('./models/user');


///////////////////
//CONFIGURATION
var ip = process.env.OPENSHIFT_NODEJS_IP;
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

if (typeof ip === "undefined") {
  console.warn("No OPENSHIFT_NODEJS_IP var, using 127.0.0.1");
  ip = "127.0.0.1";
}
mongoose.connect(config.database);
app.set('superSecret', config.secret);

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//UPLOADFILE
app.use(fileUpload());

//LOGS
app.use(morgan('dev'));

app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
  // Pass to next layer of middleware
  next();
});

app.get("/products", function(req, res) {
  console.log("Get all products");
  var products = [
    {
      name: "Cadeira de ferro",
      description: "Cadeira de ferro verde em bom estado, otima para o jardim",
      imgurl: "/234567/cadeira-ferro.jpg"
    },
    {
      name: "Maquina fotografica da Nikon",
      description:
        "Maquina usada poucas vezes vai com o cartao de memória da sandisk de 1.0gb\n O carregador  e o cabo para passar fotos para o computador \n E a capinha para guardar \nja vai carregada nao e a pilha \n esta funcionando perfeitamente Grava video tbm",
      imgurl: "/123456/maquina.jpg"
    },
    {
      name: "Cadeira de ferro",
      description: "Cadeira de ferro verde em bom estado, otima para o jardim",
      imgurl: "/345678/televisao.jpg"
    }
  ];

  res.send(products);
});

app.post("/product", function(req, res) {
  console.log("Got a POST request to create a new product");
  if (!req.files) 
    return res.status(400).send("No files were uploaded.");
  
  console.log('Uploading file ' +req.files.filetoupload.name + '...');

  let filetoupload = req.files.filetoupload;

  filetoupload.mv("public/app/images/uploads/" + req.files.filetoupload.name, function(err) {
    if (err) return res.status(500).send(err);
    res.send("File uploaded!");
  });
});

app.delete("/product", function(req, res) {
  console.log("Got a DELETE request to delete a product");
  res.send("Hello DELETE");
});

app.get("/product", function(req, res) {
  console.log("Got a GET request get product");
  res.send("Page GET");
});

app.get("/logout", function(req, res) {
  console.log("Logout");
  res.send("You have been logged out of the system!");
});

app.get('/setupAdmin', function(req, res) {
	console.log("TEST setupAdmin ");
	var admin = new User({ 
		email: 'test@gmail.com', 
		password: 'password',
		admin: true 
	});
	
	admin.save(function(err){
      if(err){
           console.log(err);
           return;
      }

      res.json({ admin: admin });
  });
});


// API ROUTES -------------------
// get an instance of the router for api routes
var routes = express.Router(); 

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
routes.post('/authenticate', function(req, res) {

  // find the user
  User.findOne({
    email: req.body.email
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token with only our given payload
    // we don't want to pass in the entire user since that has the password
    const payload = {
      admin: user.admin 
    };
        var token = jwt.sign(payload, app.get('superSecret'), {
          expiresInMinutes: 60 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }   
    }
  });
});

// route middleware to verify a token
routes.use(function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  //decode
  if (token) {

    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {
    return res.status(403).send({ 
        success: false, 
        message: 'Not Authorized!' 
    });

  }
});

// route to show a random message (GET http://localhost:8080/api/)
routes.get('/', function(req, res) {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});

// route to return all users (GET http://localhost:8080/api/users)
routes.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});   

// apply the routes to our application with the prefix /api
app.use('/api', routes);


app.use("/", express.static("public/"));

app.listen(port, ip);
console.log("App listening at http://%s:%s", ip, port);