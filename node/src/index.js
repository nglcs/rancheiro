const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const apiRoutes = require("../api/api-routes");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var port = process.env.PORT || 8080;
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => res.send('Hello World with Express'));

app.use('/api', apiRoutes);


app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});