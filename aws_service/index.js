const cluster = require('cluster');
const express = require('express');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const redis = require('redis');
const uploadAPK = require("./routes/uploadAPK");

// import the models
require('./models/Project');

// mongodb setup
mongoose.connect(keys.mongoURI,   { useUnifiedTopology: true,  useNewUrlParser: true })
.then(()=> console.log("mongodb connect success"))
.catch(err => console.log(err));

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

    // import the routes
    //require('./routes/projectRoutes')(app);

    app.get('/aws-service/test-service', (req, res)=>{
        res.send("Hello world");
    })

    app.post("/aws-service/test-service/uploadapk", uploadAPK);
    
    const PORT = keys.PORT || 5000;
    app.listen(PORT, ()=>{
        console.log(`Listening on port`, PORT)
    })
}

