const mongoose = require("mongoose");

const mongoURL = 'mongodb+srv://shreya30c:yAj6aXc7MLIna51W@library.plhmgfe.mongodb.net/';

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("MongoDB connection error:", err));

module.exports = mongoose;
