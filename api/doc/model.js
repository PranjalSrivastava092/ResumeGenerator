const mongoose = require('mongoose');

var DocSchema = new mongoose.Schema({
    image: String,
    docno: String,
    heading: String,
    profile: String,
    areasofexpertise: String,
    education: [String],
    technical: String,
    workexperience: {
        jobtitle: String,
        details: [String]
    }
})

module.exports = mongoose.model('Doc', DocSchema);