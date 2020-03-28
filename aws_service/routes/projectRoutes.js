const mongoose = require('mongoose');

const Project = mongoose.model('Project');

module.exports = app => {
    /**
     * Get project by id
     */
    app.get('/projects/:id/user/:userid', async (req, res) => {
        const project = await Project.findOne({
            _user: req.params.userid, 
            _id: req.params.id
        })
        res.send(project);
    });

    /**
     * Get all projects created by user
     */
    app.get('/projects/user/:userid', async (req, res)=>{
        var userid = req.params.userid;
        const projects = await Project.find({
            _user: userid
        });
        res.send(projects);
    });

    /**
     * Create a new proejct
     */
    app.post('/projects/:userid', async (req, res)=>{
        const { title, description, type } = req.body;
        var userid = req.params.userid;
        const project = new Project({
            title, 
            description,
            type, 
            _user: userid
        });

        try {
            await project.save();
            res.send(proejct);
        } catch (err) {
            res.send(400, err);
        }

    });

}
