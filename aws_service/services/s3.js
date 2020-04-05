const AWS = require('aws-sdk');
const keys = require('../config/keys');

AWS.config.update({
    bucketName: 'cmpe281-impact-bucket',
    accessKeyId: keys.accessKeyId,
    secretAccessKey: keys.secretAccessKey,
    region:'us-west-1'
});

var s3 = new AWS.S3();
module.exports = s3;