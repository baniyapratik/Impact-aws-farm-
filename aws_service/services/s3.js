const AWS = require('aws-sdk');
const keys = require('../config/keys');

const config = {
  Bucket: 'impact-mtaas-artifact-store',
  accessKeyId: keys.accessKeyId,
  secretAccessKey: keys.secretAccessKey,
  region: 'us-east-2',
};

console.log('Config for S3 : ' + JSON.stringify(config));

const s3 = new AWS.S3(config);
module.exports = s3;
