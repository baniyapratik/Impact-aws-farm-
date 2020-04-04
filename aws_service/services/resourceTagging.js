const AWS = require('aws-sdk');
const keys = require('../config/keys');
AWS.config.update({
    accessKeyId: keys.accessKeyId,
    secretAccessKey: keys.secretAccessKey,
    region:'us-west-2'
});

var resourceTagging = new AWS.ResourceGroupsTaggingAPI({apiVersion: '2017-01-26'});
module.exports = resourceTagging;