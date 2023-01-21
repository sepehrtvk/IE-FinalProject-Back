const mongoose = require("mongoose");

const urlsSchema = new mongoose.Schema({
  endPoint: {
    type: String,
    required: [true, "please tell us your endPoint"],
  },
  thereshold: {
    type: Number,
    required: [true, "please tell us your thereshold"],
  },
  userId: {
    type: String,
    required: [true, "please tell us your id"],
  },
});

const urls = mongoose.model("urls", urlsSchema);

module.exports = urls;
