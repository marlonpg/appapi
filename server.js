var express = require("express");
var app = express();
var fileUpload = require("express-fileupload");
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var jwt    = require('jsonwebtoken');
var config = require('./config');
var User   = require('./models/user');
var Product   = require('./models/product');

///////////////////
//CONFIGURATION
var ip = process.env.OPENSHIFT_NODEJS_IP;
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

if (typeof ip === "undefined") {
  console.warn("No OPENSHIFT_NODEJS_IP var, using 127.0.0.1");
  ip = "127.0.0.1";
}
mongoose.connect(config.database);
app.set('secret', config.secret);

//ACCESS POST body information and URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//UPLOADFILE
app.use(fileUpload());

//LOGS
app.use(morgan('dev'));

//Cross-Origin Resource Sharing (CORS) is a mechanism that uses additional HTTP headers to let a user agent gain permission to access selected resources from a server on a different origin (domain) than the site currently in use. 
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/products", function(req, res) {
  console.log("Get all products");
  
	Product.find(function(err, products) {
		if (err){
			res.send(err);
		}
		res.json(products);
	});
});

app.get("/product/:id", function(req, res) {
	console.log("getProductById: "+ req.params.id);
	var id = req.params.id;
	var ObjectId = require('mongoose').Types.ObjectId; 
	var query = { "_id" : new ObjectId(id)};

	Product.find(query, function (err, product) {
		if (err){
			return res.status(500).send(err);
		}
		return res.status(200).send(product);	
	});
});

//TODO
app.delete("/product/:id", function(req, res) {
	console.log("Got a DELETE request to delete a product: "+ req.params.id);

	Model.remove({ _id: req.params.id }, function(err) {
		if(err){
			console.log(err);
			return;
		}
		res.json({ message: 'Product has been deleted successfully!' });
	});
});

//TODO
app.get("/logout", function(req, res) {
  console.log("Logout");
  res.send("You have been logged out of the system!");
});

///////////////////
//API ROUTES
var routes = express.Router(); 

//AUTHENTICATE USER
routes.post('/authenticate', function(req, res) {
	User.findOne({email: req.body.email}, function(err, user) {
		if (err) throw err;
	
		if (!user) {
			res.json({ success: false, message: 'Invalid credentials!' });
		} else if (user) {
			if (user.password != req.body.password) {
				res.json({ success: false, message: 'Wrong credentials!' });
			} else {
				const payload = {
					userEmail: user.email 
				};
				var token = jwt.sign(payload, app.get('secret'), {
					expiresInMinutes: 20
				});
				console.log(user.name);
				console.log(req.body);
				res.json({
					success: true,
					email:req.body.email,
					name:user.name,
					message: 'authenticated!',
					token: token
				});
			}   
		}
	});
});

//USER REGISTER
routes.post('/signup', function(req, res) {
	var name = req.body.name;
	var email = req.body.email;
	var password = req.body.password;
	
	console.log("Creating new User - NAME: %s - EMAIL: %s - PASSWORD: %s", name, email, password);
	var newUser = new User({ 
		name: name,
		email: email, 
		password: password,
		admin: false 
	});

	newUser.save(function(err){
		if(err){
			console.log(err);
			return;
		}
		res.json({ message: 'Your account has been created successfully!' });
	});
});


//ROUTE MIDDLEWARE - All below will have restricted access
routes.use(function(req, res, next) {
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	if (token) {
		jwt.verify(token, app.get('secret'), function(err, decoded) {      
			if (err) {
				return res.json({ success: false, message: 'Failed to authenticate token.' });    
			} else {
				req.decoded = decoded;    
				next();
			}
		});
	} else {
		return res.status(403).send({ 
			success: false, 
			loggedIn: false,
			message: 'Not Authorized!' 
		});
	}
});

routes.get("/product/:id", function(req, res){
	console.log("Got a GET request get product: "+ req.params.id);
	var id = req.params.id;
	var ObjectId = require('mongoose').Types.ObjectId; 
	var query = { "_id" : new ObjectId(id)};

	Product.find(query, function (err, product) {
	    if (err){
			return res.status(500).send(err);
		}

    	return res.status(200).send(product);	
	});
});

//Create new product
routes.post("/product", function(req, res) {
	//console.log(req);
	var name = req.body.productName;
	var description = req.body.productDescription;
	var category = req.body.category;
	var expirationDate = req.body.expirationDate;
	var fileName;
	var filePath;
	var fileUIPath;
	console.log("Got a POST request to create a new product");

	if (!req.files.filetoupload) {
		console.log("No files were uploaded.");
	}
	else {
		var timestamp = (new Date()).getTime();
		
		fileName = timestamp +req.files.filetoupload.name;
	
		console.log('Uploading file ' + fileName + '...');

		let filetoupload = req.files.filetoupload;

		fileUIPath = "/uploads/" + fileName;
		filePath = "public/app/images/uploads/" + fileName;
		filetoupload.mv(filePath, function(err) {
			if (err) return res.status(500).send(err);
		});
	}

	var newProduct = new Product({ 
		userEmail: 	req.decoded.userEmail,
		name: name,
		description: description,
		city: req.body.city,
		state: req.body.state,
		zipCode: req.body.zipCode,
		category: category,
		expirationDate: expirationDate,
		filePath: fileUIPath 
	});

	newProduct.save(function(err){
		if(err){
			console.log(err);
			return;
		}

		res.json({ user: newProduct });
	});
});

//ALL REGISTERED USERS
routes.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});   

//APPLYING ROUTES
app.use('/api', routes);

//STATIC CONTENT
app.use("/", express.static("public/"));

app.listen(port, ip);
console.log("App listening at http://%s:%s", ip, port);