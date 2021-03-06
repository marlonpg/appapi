var express = require('express');
var app = express();

var ip = process.env.OPENSHIFT_NODEJS_IP;
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

if (typeof ip === "undefined") {
    console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
    ip = "127.0.0.1";
};

// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.get('/products', function (req, res) {
   console.log("Get all products");
   var products = [ {name : 'Cadeira de ferro', description: 'Cadeira de ferro verde em bom estado, otima para o jardim', imgurl: '/234567/cadeira-ferro.jpg' },{ name: 'Maquina fotografica da Nikon', description: 'Maquina usada poucas vezes vai com o cartao de memória da sandisk de 1.0gb\n O carregador  e o cabo para passar fotos para o computador \n E a capinha para guardar \nja vai carregada nao e a pilha \n esta funcionando perfeitamente Grava video tbm', imgurl: '/123456/maquina.jpg' }, {name : 'Cadeira de ferro', description: 'Cadeira de ferro verde em bom estado, otima para o jardim', imgurl: '/345678/televisao.jpg' }]

   res.send(products);
});

app.post('/product', function (req, res) {
   console.log("Got a POST request to create a new product");
   res.send('Hello POST');
});

app.delete('/product', function (req, res) {
   console.log("Got a DELETE request to delete a product");
   res.send('Hello DELETE');
});

app.get('/product', function (req, res) {
   console.log("Got a GET request get product");
   res.send('Page GET');
});

app.use('/', express.static('public/'));


app.listen(port, ip);
console.log("App listening at http://%s:%s", ip, port);


