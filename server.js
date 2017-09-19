var express = require('express');
var app = express();

var ip = process.env.OPENSHIFT_NODEJS_IP;
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

if (typeof ip === "undefined") {
    //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
    //  allows us to run/test the app locally.
    console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
    ip = "127.0.0.1";
};


app.get('/products', function (req, res) {
   console.log("Get all products");
   var products = [ {name : 'Cadeira de ferro', description: 'Cadeira de ferro verde em bom estado, otima para o jardim', imgurl: '/234567/cadeira-ferro.jpg' },{ name: 'Maquina fotografica da Nikon', description: 'Maquina usada poucas vezes vai com o cartao de memória da sandisk de 1.0gb\n O carregador  e o cabo para passar fotos para o computador \n E a capinha para guardar \nja vai carregada nao e a pilha \n esta funcionando perfeitamente Grava video tbm', imgurl: '/123456/maquina.jpg' }, {name : 'Cadeira de ferro', description: 'Cadeira de ferro verde em bom estado, otima para o jardim', imgurl: '/345678/televisao.jpg' }]
   res.setHeader("Pragma", "no-cache");
   res.setHeader("Cache-Control", "no-cache");
   res.send(products);
})

app.post('/', function (req, res) {
   console.log("Got a POST request for the homepage");
   res.send('Hello POST');
})

app.delete('/del_user', function (req, res) {
   console.log("Got a DELETE request for /del_user");
   res.send('Hello DELETE');
})

app.get('/list_user', function (req, res) {
   console.log("Got a GET request for /list_user");
   res.send('Page Listing');
})


app.listen(port, ip);
console.log("App listening at http://%s:%s", ip, port);
