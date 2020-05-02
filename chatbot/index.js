const express = require('express');
const bodyparser = require('body-parser');
const app = express();
app.use(bodyparser.json());

require('./routes/dialogFlowRoutes')(app)

const PORT = 5002;
app.listen(PORT);