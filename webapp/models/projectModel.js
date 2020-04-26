/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A project must have a name'],
    unique: true,
    trim: true,
    maxlength: [100, 'A project name must have at most 100 characters'],
    minlength: [10, 'A project name must haveat least 10 characters'],
  },
  projectarn: {
    type: String,
    required: [true, 'Unable to create project in AWS device Farm'],
  },
  description: {
    type: String,
    required: [true, 'A project must have a description'],
    unique: true,
    trim: true,
  },
  start_date: {
    type: Date,
    required: [true, 'A project must have a start date'],
  },
  end_date: {
    type: Date,
    required: [true, 'A project must have a end date'],
  },
  owner: {
    type: mongoose.ObjectId,
    ref: 'Manager',
    required: [true, 'A project must have a manager who owns it'],
  },
  requiredtesters: {
    type: Number,
    required: [true, 'A project must have  the number of testers required'],
  },
  testers: [
    {
      tester: {
        type: mongoose.ObjectId,
        ref: 'Tester',
      },
      status: {
        type: String,
        required: [
          true,
          'A tester must have been either Pending approval or Accepted or denied status ',
        ],
        enum: {
          values: ['Pending', 'Accepted', 'Denied'],
        },
        default: 'Pending',
      },
    },
  ],
  devicepool: {
    devices: [
      {
        devicename: {
          type: String,
          require: true,
        },
        devicetype: {
          type: String,
          enum: {
            values: ['Android', 'Ios'],
          },
        },
        count: Number,
      },
    ],
  },
  artifacts: [
    {
      name: {
        type: String,
      },
      s3Id: {
        type: String,
      },
      owner: {
        type: mongoose.ObjectId,
      },
    },
  ],
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
