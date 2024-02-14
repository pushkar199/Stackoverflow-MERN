require('dotenv').config();
const express = require('express');
const app = express();
const User = require("./model/user");
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const PORT = process.env.PORT


app.use(bodyParser.json());


mongoose.connect("mongodb://localhost:27017/DemoAppFirst", { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err));


app.use("/", require("./routes/users"));


app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log(`Serve at http://localhost:${PORT}`);
});




