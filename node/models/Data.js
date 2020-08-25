const mongoose = require('../database')
const HostSchema = new mongoose.Schema({
    hostname: {
        type: String
    },
    type: {
        type: String
    },
    labels: {
        type: [String]
    },
    annotations: {
        type: { String }
    },
});
const EnvironmentSchema = new mongoose.Schema({
    name: {
        type: String
    },
    rancher_version: {
        type: Number
    },
    hosts: {
        type: [HostSchema]
    }

});

const DataSchema = new mongoose.Schema({
    name: {
        type: String
    },
    environment: {
        type: [EnvironmentSchema]
    }
})

const DataExportSchema = new mongoose.Schema({
    Data: [DataSchema],
    createdAt: {
        type: Date,
        default: Date.now
    }
})




const Data = mongoose.model('Data', DataExportSchema);
module.exports = Data;

module.exports.get = function (callback, limit) {
    Data.find(callback).limit(limit);
}