const router = require('express').Router();
const DataController = require('../controllers/DataController');
const mongoose = require('../database/index')
const db = mongoose.connection;
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!'
    });
});

router.route('/date/:dateSelected')
    .get(DataController.view)
module.exports = router;
