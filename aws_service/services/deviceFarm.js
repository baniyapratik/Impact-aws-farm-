const AWS = require('aws-sdk');
const keys = require('../config/keys');
const config = {
  accessKeyId: keys.accessKeyId,
  secretAccessKey: keys.secretAccessKey,
  region: 'us-west-2',
};
console.log('Config for DeviceFarm : ' + JSON.stringify(config));

var deviceFarm = new AWS.DeviceFarm(config);
module.exports = deviceFarm;
