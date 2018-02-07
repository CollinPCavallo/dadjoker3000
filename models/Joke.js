const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const JokeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    },
    saved: {
        type: Boolean,
        default: false
    }
});

const Joke = mongoose.model("Joke", JokeSchema);

module.exports = Joke;