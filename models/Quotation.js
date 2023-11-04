const mongoose= require('mongoose')
const quotationSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    destination: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Destination', 
        required: true,
    },
    departureDate: {
        type: Date,
    },
    returnDate: {
        type: Date,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending',
    },
    notes: {
        type: String,
    },
}, {
    timestamps: true,
});

module.exports= mongoose.model("Quotation", quotationSchema);