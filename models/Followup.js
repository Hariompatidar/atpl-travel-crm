const mongoose = require('mongoose');

const followupSchema = new mongoose.Schema({
    lead: {
        type: mongoose.Schema.ObjectId,
        ref: "Lead",
        required: true,
    },
    details:[
        {
            date: {
                type: Date,
                required: true, // The date and time of the follow-up
            },
            notes: {
                type: String,
                required: true, // Notes or comments related to the follow-up
            },
            outcome: {
                type: String, // Outcome of the follow-up (e.g., "Contacted," "Not interested," etc.)
            },
            followupType: {
                type: String, // Type of follow-up (e.g., "Phone call," "Email," "Meeting," etc.)
            },
        }
    ]
});

const Followup = mongoose.model('Followup', followupSchema);

module.exports = Followup;
