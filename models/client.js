'use strict'

var mongoose = require('mongoose');
var Plan = mongoose.model('Plan');
var Company = mongoose.model('Company');
var Schema = mongoose.Schema;

var ClientSchema = Schema({
    name: String,
    lastName: String,
    email: String,
    user: String,
    password: String,
    birthday: String,
    gender: String,
    phone: String,
    address: String,
    plan: { type: Schema.ObjectId, ref: "Plan" },
    is_company: Boolean,
    company: { type: Schema.ObjectId, ref: "Company" }
});

module.exports = mongoose.model('Client',ClientSchema);