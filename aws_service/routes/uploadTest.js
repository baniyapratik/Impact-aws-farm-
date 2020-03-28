const AWS = require('aws-sdk');
const keys = require('../config/keys');

const s3 = new AWS.S3({
    accessKeyId: keys.accessKeyId,
    secrectAccesKey: keys.secrectAccesKey
});

module.exports = app => {
    app.get('/api/upload-test', (req, res)=>{
        const key = `${req.user.id}/${uuid()}`;
        const _type = req.query.type;
        s3.getSignedUrl('putObject', {
            Bucket: keys.test_bucket,
            ContentType: _type,
            Key: key
        }, (err, url) => res.send({key, url}));
    });
}