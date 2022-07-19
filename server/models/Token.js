const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema({
  _id:{
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  strict: true,
  collection: 'Tokens'
});

const Token = mongoose.model("Token", TokenSchema);

module.exports = Token;
