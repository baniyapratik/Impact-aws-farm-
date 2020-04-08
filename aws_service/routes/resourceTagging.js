const mongoose = require('mongoose');
const {check, validationResult} = require('express-validator/check');
const resourceTagging = require('../services/resourceTagging');

module.exports = (app) => {
    /**
     * Create tag for resource
     * @param {String} resourceArn
     * @param {Object[]} tags - array of key value pair of tags
     Payload:
     {
        "resourceArn": "arn:aws:s3:::impact-test-packages",
        "tags": {
        "projectName": "Impact", "type": "s3"
        }
     }
     */
    app.post('/aws-service/tag-resource', async(req,res)=>{


        const { resourceArn, tags } = req.body;
        
        console.log(tags);
        var params = {
            ResourceARNList: [ resourceArn,
            ],
            Tags: tags
          };
          resourceTagging.tagResources(params, function(err, data) {
            if (err) res.status(400).send(error.stack); 
            else     res.send("tagged");
          });
    });

    /**
     * Get resource tag
     * @param {String} key
     * @param {Object[]} values - array of string values
     * 
     * Payload :
    {
        "key": "projectName",
        "value": ["s3"]
            
    }
     */
    app.post('/aws-service/get-tag-resource/',
        [
            check('key', 'You need key').not().isEmpty(),
            check('values[*]').isLength({ min: 1, max: 10 })
        ]
        , async(req,res)=>{

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).jsonp(errors.array());
        } 
        const { key, values } = req.body;
        var params = {
            TagFilters: [
              {
                Key: key,
                Values: values
              },
            ],
          };
          resourceTagging.getResources(params, function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else res.send(data);
          });
    });
}