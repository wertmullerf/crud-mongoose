const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4: uuidv4 } = require("uuid");

const urlSchema = new Schema({
    origin: {
        type: String,
        unique: true,
        required: true,
    },
    shortURL: {
        type: String,
        unique: true,
        required: true,
        default: () => uuidv4(),
    },
});

const Url = mongoose.model("Url", urlSchema);

module.exports = Url;
