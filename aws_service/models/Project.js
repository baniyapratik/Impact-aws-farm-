const mongoose = require('mongoose');
const { Schema } = mongoose;

const projectSchema = new Schema({
    title: String, 
    arn: String,    
    description: String,
    createdAt: { type: Date, default: Date.now},
    _user: String,
    isDeleted: {
        type: Boolean, 
        default: false
    }
});

mongoose.model('Project', projectSchema);