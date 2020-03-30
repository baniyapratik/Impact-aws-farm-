const mongoose = require('mongoose');
const Test = mongoose.model('Test');
const TestSuite = mongoose.model('TestSuite');
const deviceFarm = require('../services/deviceFarm');

module.exports = (app) => {
   
    /**
     * Get all test cases for given test suite
     */
    app.get('/aws-service/projects/:projectid/testsuite/:testsuiteid/test-package/', async (req, res)=>{
        var testSuiteId = req.params.testsuiteid;
        const testPackage = await Test.find({
            testSuiteId
        });
        res.send(testPackage);
    });
    /**
     * Delete test by test id
     */
    app.delete('/aws-service/projects/:projectid/testsuite/:testsuiteid/test-package/:testid', async (req, res)=>{
        var testid = req.params.testid;
        const testPackage = await Test.findOne({
            _id: testid
        });

        var params = {
            arn: testPackage.testArn
        }

        deviceFarm.deleteUpload(params, async function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else   {
                await testPackage.delete();
                res.status(200).send('Done');
            }
          });
    });

    /**
     * Get test by id
     */
    app.get('/aws-service/projects/:projectid/testsuite/:testsuiteid/test-package/:testid', async (req, res)=>{
        var testid = req.params.testid;
        const testPackage = await Test.findOne({
            _id: testid
        });
        res.send(testPackage);
    });

    /**
    Upload the test
     
    ## payload
    {
        "title": "Test Package",
        "type" : "APPIUM_PYTHON_TEST_PACKAGE"
    }
     */
    app.post('/aws-service/projects/:projectid/testsuite/:testsuiteid/test-package/user/:userid', async (req, res)=>{
        const { title, type } = req.body;
        const testSuiteId = req.params.testsuiteid;
        const userId = req.params.userid;
        const testSuite = await TestSuite.findOne({
            _id:testSuiteId
        });

        if (!testSuite){
            res.status(400).send('Bad Request');
        }
        var params = {
            name: title,
            type,
            projectArn: testSuite.projectArn

        }
        deviceFarm.createUpload(params, async (err, data)=>{
            if (err) console.log(err, err.stack);
            else {
                const testPackage = new Test({
                    title, 
                    type,
                    testSuiteId,
                    ownerId: userId,
                    testArn: data.upload.arn,
                    status: data.upload.status,
                    testURL: data.upload.url
                    
                });
                try {
                    await testPackage.save();
                    console.log(testPackage);
                    res.status(200).json(testPackage);
                } catch (err) {
                    res.send(400).send(err);
                }
            }
        })
          
    });
}
