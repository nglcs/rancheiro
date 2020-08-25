const mongoose = require('mongoose');
mongoose.connect("mongodb://rancher-diagrama-db-srv:27017/rancher-diagram", { useNewUrlParser: true, useUnifiedTopology: true });
//mongoose.connect("mongodb://localhost:27017/rancher-diagram", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;
