/**
 Get Test Suite
 Post Test Suite
 Upload Test Suite
 Submit Test
 */
const mongoose = require('mongoose');
const { Schema } = mongoose;

const testSchema = new Schema({
    awsRunId: String,
    _test: '',
    type: {
        type: String,
        enum: ['Physical', 'Virtual'],
        default: "Virtual"
    },
    created: { type: Date, default: Date.now },
    status: {
        type: String,
        emum: ['pending', 'processing', 'scheduling', 'preparing', 'running',
        'completed', 'stopping'],
        default: 'none'
    },
    result: {
        type: String,
        emum: ['pending', 'passed', 'warned', 'failed', 'skipped',
        'errored', 'stopped'],
        default: 'none'
    },
    started: { type: Date, default: Date.now},
    stopped: Date
});

mongoose.model('Test', testSchema);