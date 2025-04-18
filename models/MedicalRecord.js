const mongoose = require('mongoose');

const MedicalRecordSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    visitDate: {
        type: Date,
        required: true
    },
    diagnosis: {
        type: String,
        required: true
    },
    treatment: {
        type: String,
        required: true
    },
    prescription: {
        type: String
    },
    notes: {
        type: String
    },
    attachments: [{
        fileName: String,
        fileType: String,
        filePath: String,
        uploadDate: {
            type: Date,
            default: Date.now
        }
    }],
    labResults: [{
        testName: String,
        result: String,
        date: Date,
        labName: String
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('MedicalRecord', MedicalRecordSchema);