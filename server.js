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

app.get('/', function (req, res) {
	res.send('Hello World');
});

app.listen(port, ip);
console.log("App listening at http://%s:%s", ip, port);
