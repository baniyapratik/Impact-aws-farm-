const mongoose = require('mongoose');
const { Schema} = mongoose;

const testResultSchema = new Schema({
    name: String, 
    type: {
        type: String,
        enum: ['Physical', 'Virtual'],
        default: "Physical"
    },    
    description: String,
    createdAt: { type: Date, default: Date.now},
    _user: String,
    counters:[{
        total: Integer,
        passed: Integer,
        failed: Integer,
        warned: Integer,
        errored: Integer,
        stopped: Integer,
        skipped: Integer
    }]
});

mongoose.model('TestResult', testResultSchema);