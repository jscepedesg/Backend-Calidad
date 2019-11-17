'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Plan = mongoose.model('Plan');

var LunchBoxSchema = Schema({
    name: String,
    ingredients: [String],
    plan: { type: Schema.ObjectId, ref: "Plan" }
});

module.exports = mongoose.model('LunchBox',LunchBoxSchema);