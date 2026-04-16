const mongoose = require('mongoose');

const ConductSchema = new mongoose.Schema({
    studentName: { type: String, required: true },
    department: { type: String, enum: ['EXTC', 'IT', 'COMPS', 'PROD'], required: true },
    clothingCoverage: { 
        type: Number, 
        required: true, 
        min: 0, 
        max: 100 // Percentage of body covered
    },
    isSleeveless: { type: Boolean, default: false },
    safetyProbability: { type: Number, default: 0 }
});

module.exports = mongoose.model('Conduct', ConductSchema);