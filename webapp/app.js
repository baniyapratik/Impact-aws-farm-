const express = require('express');
const morgan = require('morgan');
const managerRouter = require('./routes/managerRoutes');
const testerRouter = require('./routes/testerRoutes');
const projectRouter = require('./routes/projectRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', '*');
  next();
});

app.use('/managers', managerRouter);
app.use('/testers', testerRouter);
app.use('/projects', projectRouter);

app.get('/test', (req, res) => {
  res.status(200).json({
    message: 'Hello from ther server',
  });
});

module.exports = app;
