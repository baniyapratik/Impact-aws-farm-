const mongoose = require('mongoose');

const TestSuite = mongoose.model('TestSuite');
const Project = mongoose.model('Project');

module.exports = app => {
    /**
    Get test suite by id

    ## Response: 

    */
    app.get('/aws-service/projects/:projectid/testsuite/:testsuiteid', async (req, res) => {
        const testSuite = await TestSuite.findOne({
            _id: req.params.testsuiteid
        })
        res.send(testSuite);
    });

    /**
    Get all test suites in your project
     
    ## Response:

    */
    app.get('/aws-service/projects/:projectid/testsuite/', async (req, res)=>{
        var projectId = req.params.projectid;
        const testSuites = await TestSuite.find({
            projectId: projectId
        });
        res.send(testSuites);
    });

    /**
    Create a test suite
    
    ## Payload: 

    */
    app.post('/aws-service/projects/:projectid/testsuite/user/:userid', async (req, res)=>{
        var userId = req.params.userid;
        var projectId = req.params.projectid;
        const project = await Project.findOne({
            _id: projectId
        })
        console.log(project)
        const { title, description } = req.body;
        const testSuite = new TestSuite({
            title, 
            description,
            ownerId: userId,
            projectId: project._id,
            projectArn: project.arn
        });
        console.log(testSuite);
        try {
            await testSuite.save();
            console.log(testSuite);
            res.status(200).json(testSuite);
        } catch (err) {
            res.send(400).send(err);
        }

    });
}
