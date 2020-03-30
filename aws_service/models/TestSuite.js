/**
 Get, Create and delete test suite
 */
const mongoose = require('mongoose');
const { Schema} = mongoose;

const testSuiteSchema = new Schema({
    title: String,   
    description: String,
    ownerId: String,
    projectArn: String,
    projectId: { type: Schema.Types.ObjectId, ref: 'Project'}  
});

mongoose.model('TestSuite', testSuiteSchema);