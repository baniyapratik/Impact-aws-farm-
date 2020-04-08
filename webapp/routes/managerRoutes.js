const express = require('express');
const managerController = require('./../controllers/managerController');

const router = express.Router();

router.route('/').post(managerController.createManager);

router
  .route('/:managerid')
  .get(managerController.getManager)
  .patch(managerController.updateManager);
router.route('/:managerid/projects').get(managerController.getProjects);

module.exports = router;
