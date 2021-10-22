'using strict'
const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const Recipe = new Schema ({
    name: {
        type: String,
        required: true,
    },
    ingredients: {
        type: [String],
        required: true,
    },
    howto: {
        type: String,
        required: true,
        trim: true
    },
    tags: {
        type: [String],
    },
});

module.exports = Mongoose.model("Recipe", Recipe);