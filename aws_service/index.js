
const cluster = require('cluster');
const express = require('express');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const redis = require('redis');
const session = require('express-session');

// import the models
require('./models/Project');
require('./models/TestSuite');
require('./models/Test');

// mongodb setup
mongoose.connect(keys.mongoURI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log("mongodb connect success"))
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
    app.use(session({
        secret: 'cmpe281_secret',
        resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
        saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
        duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
        activeDuration: 5 * 60 * 1000
    }));

    // import the routes
    require('./routes/projectRoutes')(app);
    require('./routes/testSuiteRoutes')(app);
    require('./routes/testPackageRoutes')(app);

    app.get('/aws-service/test-service', (req, res) => {
        res.send("Hello world");
    });

    app.use(require('./routes/testRunnerRoutes'));

    const PORT = keys.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Listening on port`, PORT)
    })
}

