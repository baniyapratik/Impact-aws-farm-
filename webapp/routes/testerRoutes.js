const express = require('express');
const testerController = require('./../controllers/testerController');
const projectController = require('./../controllers/projectController');

const router = express.Router();

router.route('/').post(testerController.createTester);
router.route('/projects').get(projectController.getAllProjects);

router
  .route('/:testerid')
  .get(testerController.getTester)
  .patch(testerController.updateTester);

router.route('/firebase/:testerid').get(testerController.getTesterByFirebaseId);
router.route('/:testerid/projects').get(testerController.getProjects);

module.exports = router;
