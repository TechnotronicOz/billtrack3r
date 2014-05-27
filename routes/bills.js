var express = require('express'),
    router = express.Router(),
    pass = require('../config/passport'),
    mongoose = require('mongoose'),
    dbStr = 'mongodb://localhost/billtrack3r';

//mongoose.connect('mongodb://localhost/billtrack3r');
var d = mongoose.createConnection(dbStr);
/* var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log('connected to mongo...');
}); */

// Our bill model schema
var Schema = new mongoose.Schema({
    id: Number,
    user: String,
    billName: String,
    billDueDate: { type: Date, default: Date },
    billAmount: Number,
    billPd: Boolean,
    billPdDate: { type: Date, default: Date },
    billPdAmt: Number,
    billConf: String
});

// Our weather model from the schema
var BillModel = mongoose.model('Bill', Schema);
d.model = BillModel;

// Get all models
router.get('/', function(req, res) {
    console.log('get...');
    console.log(req.user.email);
    // {_id : "ObjectId(4d2a0fae9e0a3b4b32f70000)"}
    //BillModel.find({ userId: "ObjectId("+req.user._id+")"}, function(err, models) {
    BillModel.find({ 'user': req.user.email }, function(err, models) {
        if (err) {
            return console.log('Error', err);
        }
        console.log('models');
        return res.send(models);

    });
});

// Create new model
router.post('/', function(req, res) {
    console.log('Creating new Bill Model');
    var model = new BillModel({
        user: req.body.user,
        billName: req.body.billName,
        billDueDate: req.body.billDueDate,
        billAmount: req.body.billAmount,
        billPd: false
    });

    return model.save(function(err) {
        if (err) {
            console.log('Error', err);
        }
        return res.send(model);
    });
});

// Update model
router.put('/:id', function(req, res) {
    console.log('Updating bil; ' + req.body.id);
    return BillModel.findById(req.params.id, function(err, model) {
        /* model.city = req.body.city;
        model.state = req.body.state;
        model.time = Date.now() */

        return model.save(function(err) {
            if (err) {
                return console.log('Save error ' + err);
            }
            return res.send(model);
        });
    });
});

//Delete model
router.delete('/:id', function(req, res) {
    console.log('Deleting entry: ' + req.params.id);
    return BillModel.findById(req.params.id, function(err, model) {

        if (model == null) {
            return res.send('');
        }

        return model.remove(function(err) {
            if (!err) {
                return res.send('');
            } else {
                return console.log('error', err);
            }
        });
    });
});

module.exports = router;
