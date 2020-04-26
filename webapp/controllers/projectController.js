/* eslint-disable prettier/prettier */
const aws = require('aws-sdk');
const Project = require('./../models/projectModel');

const projectController = {};

projectController.createProject = async (req, res) => {
  try {
    const config = {
      region: 'us-west-2',
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    };
    const devicefarm = new aws.DeviceFarm(config);
    const projectRequest = req.body;
    const params = {
      name: projectRequest.name,
      defaultJobTimeoutMinutes: '10',
    };

    const data = await devicefarm.createProject(params).promise();
    console.log(data);
    projectRequest.projectarn = data.project.arn;
    const project = await Project.create(projectRequest);
    res.status(200).json({
      status: 'success',
      data: {
        project,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failure',
      messsage: err,
    });
  }
};

projectController.getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectid);
    res.status(200).json({
      status: 'success',
      data: {
        project,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failure',
      messsage: err,
    });
  }
};

projectController.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();

    res.status(200).json({
      status: 'success',
      data: {
        projects,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failure',
      message: err,
    });
  }
};

projectController.updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.projectid,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: 'success',
      data: {
        project,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failure',
      message: err,
    });
  }
};

projectController.getS3 = async (req, res) => {
  try {
    const S3_BUCKET = process.env.BUCKET;
    const config = {
      region: 'us-east-2',
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      Bucket: S3_BUCKET,
    };

    const s3 = new aws.S3(config);
    const file = {};
    file.fileName = req.body.fileName;
    file.fileType = req.body.fileType;

    const s3Params = {
      Bucket: S3_BUCKET,
      Key: `${file.fileName}.${file.fileType}`,
      Expires: 500,
      ContentType: `application/${file.fileType}`,
      ACL: 'public-read',
    };
    console.log(s3Params);

    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if (err) {
        console.log(err);
        res.json({ success: false, error: err });
      } else {
        console.log(data);
        const returnData = {
          signedRequest: data,
          url: `https://${S3_BUCKET}.s3.amazonaws.com/${file.fileName}.${
            file.fileType
          }`,
        };

        res.json({ success: true, data: { returnData } });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = projectController;
