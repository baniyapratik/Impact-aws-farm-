const cluster = require('cluster');
const express = require('express');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const redis = require('redis');

// mongodb setup
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useMongoClient: true }).then(()=>{
    console.log("mongodb connect success");
});

// redis client setup
const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
});

if (cluster.isMaster) {
    cluster.fork();
    cluster.fork();
} else {
    const app = express();
    app.use(bodyParser.json());
    app.use(cors());

    app.get('/', (req, res)=>{
        res.send("Hello");
    })
    const PORT = keys.PORT || 5000;
    app.listen(PORT, ()=>{
        console.log(`Listening on port`, PORT)
    })
}

