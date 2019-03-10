const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UrlSchema = new Schema({
    id: Schema.Types.ObjectId,
    original_url: {
        type: String,
        unique: true
    },
    short_url: {
        type: Number,
        unique: true
    }
});

module.exports = mongoose.model('Url', UrlSchema);