/***
  jobs that is running on aws
 */

const mongoose = require('mongoose');
const { Schema} = mongoose;

const projectSchema = new Schema({
    awsRunId: String, 
    _test: '',
    type: {
        type: String,
        enum: ['Physical', 'Virtual'],
        default: "Virtual"
    },    
    notes: String,
    started: { type: Date, default: Date.now},
    ended: Date,
    started_by: String,
    updated_by: String,
    status: {
        type: String,
        emum: ['started', 'in-progress', 'complete', 'stopped', 'none'],
        default: 'none'

    }
});

mongoose.model('Project', projectSchema);