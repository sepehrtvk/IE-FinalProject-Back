const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  url: {
    type: String,
    required: [true, "please tell us your url"],
  },
  statusText: {
    type: String,
    required: [true, "please tell us your statusText"],
    lowercase: true,
  },
  statusCode: {
    type: String,
    required: [true, "please tell us your statusCode"],
  },
  errorCount: {
    type: Number,
  },
});

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
