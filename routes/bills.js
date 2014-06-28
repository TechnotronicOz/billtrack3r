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
    billDueDate: String,
    billAmount: Number,
    billPd: Boolean,
    billPdDate: String,
    billPdAmt: Number,
    billConf: String
});

// Our weather model from the schema
var BillModel = mongoose.model('Bill', Schema);
d.model = BillModel;

// Get all models
router.get('/', function(req, res) {
    console.log('get...');
    BillModel.find({ 'user': req.user.email }, function(err, models) {
        if (err) {
            return console.log('Error', err);
        }
        return res.send(models);

    });
});

// Create new model
router.post('/', function(req, res) {
    console.log('Creating new Bill Model');
    var user = req.user.email;
    var model = new BillModel({
        //user: req.body.user,
        user: user,
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
    console.log('Updating bill ' + req.body.id);
    return BillModel.findById(req.params.id, function(err, model) {
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
                console.log('error', err);
                return res.send(err);
            }
        });
    });
});

module.exports = router;
