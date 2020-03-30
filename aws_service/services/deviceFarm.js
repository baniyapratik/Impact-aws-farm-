
const AWS = require('aws-sdk');
const keys = require('../config/keys');
AWS.config.update({
    accessKeyId: keys.accessKeyId,
    secretAccessKey: keys.secretAccessKey,
    region:'us-west-2'
});

var deviceFarm = new AWS.DeviceFarm();
module.exports = deviceFarm;