const moment = require('moment')
Data = require('../models/Data');
exports.index = function (req, res) {
    Data.get(function (err, data) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Data retrieved successfully",
            data: data
        });
    });
};
// Handle view contact info
exports.view = function (req, res) {

    Data.find({
        'createdAt': {
            $gte: moment(req.params.dateSelected).set({ hour: -3, minute: 0, second: 0, millisecond: 0 }).toISOString(),
            $lt:  moment(req.params.dateSelected).set({ hour: 20, minute: 0, second: 0, millisecond: 0 }).toISOString()
        }
    }, function (err, data) {
        if (data.length === 0) {
            res.json({
                status: "not found",
                data: data
            });
            return
        }
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            data: data
        });
    });
};
