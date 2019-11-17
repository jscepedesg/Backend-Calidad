'use strict'

var mongoose = require('mongoose');
var Type_pay = mongoose.model('TypePay');
var Schema = mongoose.Schema;

var PlaneSchema = Schema({
    plan_premiun: Boolean,
    payment_period: String,
    lunchbox_amount: Number,
    pay: { type: Schema.ObjectId, ref: "Type_pay" }
});

module.exports = mongoose.model('Plan',PlaneSchema);