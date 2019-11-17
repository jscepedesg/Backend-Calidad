'use strict'

var mongoose = require('mongoose');
var Client = mongoose.model('Client');
var MedicalProfile = mongoose.model('MedicalProfile');
var Schema = mongoose.Schema;

var KidSchema = Schema({
    name: String,
    lastName: String,
    gender: String,
    birthday: String,
    dad: { type: Schema.ObjectId, ref: "Client" },
    medicalProfile: { type: Schema.ObjectId, ref: "MedicalProfile" }
});

module.exports = mongoose.model('Kid',KidSchema);