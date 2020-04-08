const aws = require('aws-sdk');
const Project = require('./../models/projectModel');

const projectController = {};

projectController.createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
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
    const fileName = req.body.fileName;
    const fileType = req.body.fileType;

    const s3Params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      Expires: 500,
      ContentType: fileType,
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
          url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`,
        };

        res.json({ success: true, data: { returnData } });
      }
    });
  } catch (err) {
    console.log(err);
  }
};
module.exports = projectController;
