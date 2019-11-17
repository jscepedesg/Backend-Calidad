'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MedicalProfileSchema = Schema({
    description: String,
    allergies: [String]
});

module.exports = mongoose.model('MedicalProfile',MedicalProfileSchema);