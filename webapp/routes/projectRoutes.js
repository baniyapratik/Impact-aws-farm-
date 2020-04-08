const express = require('express');
const projectController = require('./../controllers/projectController');

const router = express.Router();

router.route('/').post(projectController.createProject);

router
  .route('/:projectid')
  .get(projectController.getProject)
  .patch(projectController.updateProject);

router.route('/:projectid/artifacts/').post(projectController.getS3);

module.exports = router;
