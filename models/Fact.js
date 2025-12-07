const mongoose = require('mongoose');

const factSchema = new mongoose.Schema({
    userName: String,
    factText: String
});

module.exports = mongoose.model('Fact', factSchema);