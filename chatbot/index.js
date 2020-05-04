const express = require('express');
const bodyparser = require('body-parser');
const app = express();

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', '*');
  next();
});
app.use(bodyparser.json());

require('./routes/dialogFlowRoutes')(app);

const PORT = 5002;
app.listen(PORT);
