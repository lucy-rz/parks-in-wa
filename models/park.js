const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parkSchema = new Schema ({
    parkName: { type: String, required: true },
    parkCode: { type: String },
    parkImage: { type: String },
});


module.exports = mongoose.model('Park', parkSchema);