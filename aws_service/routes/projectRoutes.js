const mongoose = require('mongoose');
const Project = mongoose.model('Project');
const deviceFarm = require('../services/deviceFarm');

module.exports = (app) => {
    
    /**
    Get project by id

    ## Response: 
    {
        "isDeleted": false,
        "_id": "5e8049fe7c436400242a462d",
        "title": "Test Project",
        "description": "This is for UnitTest",
        "_user": "pratik",
        "arn": "arn:aws:devicefarm:us-west-2:332883107157:project:c90c1e93-f4a7-4930-96ae-a0e3b9a56e35",
        "createdAt": "2020-03-29T07:10:54.368Z",
        "__v": 0
    }
     */
    app.get('/aws-service/projects/:id', async (req, res) => {
        const project = await Project.findOne({
            _id: req.params.id, isDeleted: { $ne: true}
        });
        if (project){
            res.send(project);      
        } else res.status(400).send('Bad Request');
         
    });

    /**
    Get all projects created by user
     
    ## Response:
    [
        {
            "isDeleted": false,
            "_id": "5e7ff47e4f8c44001c5dce66",
            "title": "Test Project",
            "description": "This is for UnitTest",
            "_user": "userId",
            "createdAt": "2020-03-29T01:06:06.195Z",
            "__v": 0
        }
    ]
     */
    app.get('/aws-service/projects/user/:userid', async (req, res)=>{
        var userid = req.params.userid;
        const projects = await Project.find({
            _user: userid, isDeleted: { $ne: true}
            
        });
        res.send(projects);
    });
    /**
    * Delete a project
    */
   app.delete('/aws-service/projects/:id', async (req, res) => {
    const project = await Project.findOne({
        _id: req.params.id
    });
    console.log(project);
    if (project){
        var params = {
            arn: project.arn
        }
        console.log(params);
        deviceFarm.deleteProject(params, async function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else {
                console.log("deleting the project")
                project.isDeleted = true;
                await project.save();
                res.send(200);
            }})      

    } else res.status(400).send('Bad Request');
    });

    /**
    Create a new proejct
    
    ## Payload: 
        {
            "title": "Test Project",
            "description": "This is for UnitTest"
        }
    */
    app.post('/aws-service/projects/user/:userid', async (req, res)=>{
        const { title, description } = req.body;
        var userid = req.params.userid;
        var params = {
            name: title
        }
        console.log("about to create a project");
        deviceFarm.createProject(params, async function(err, data){
            if (err) console.log(err, err.stack);
            else {
                console.log("creating a new project")
                const project = new Project({
                    title, 
                    description,
                    _user: userid,
                    arn: data.project.arn
                });
                try {
                    await project.save();
                    console.log(project);
                    res.status(200).json(project);
                } catch (err) {
                    res.send(400).send(err);
                }
            }
        });
    });

}
