'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var lunchbox = mongoose.model('LunchBox');
var OrderSchema = Schema({
    type_lunchbox: { type: Schema.ObjectId, ref: "lunchbox" },
    quantity: Number
});

module.exports = mongoose.model('Order',OrderSchema);