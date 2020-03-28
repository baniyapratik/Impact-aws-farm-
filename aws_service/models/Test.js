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
    name: String,
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
    stopped: Date,
    counters:[{
        total: Integer,
        passed: Integer,
        failed: Integer,
        warned: Integer,
        errored: Integer,
        stopped: Integer,
        skipped: Integer
    }],
    message: String,
    deviceMinutes:[{
        total: Float32Array,
        metered: Float32Array,
        unmetered: Float32Array
    }]
});

mongoose.model('Test', testSchema);