const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// var redis = require('redis')
// var client = redis.createClient()

// client.set('string key', 'string val', redis.print);
// client.get('string key', 'string val', redis.print);

const dotenv = require("dotenv");
dotenv.config();

const routesV1 = require("./routes/v1");
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json())

routesV1(app);

const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Conectado a MongoDB")

    app.listen(PORT, () => {
        console.log("Running on " + PORT)
    })

}).catch(error => {
    console.log("mongoDB error", error)

})