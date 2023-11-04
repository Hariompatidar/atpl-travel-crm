const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        number: {
            type: String,
            required: true,
        },
        travelDate: {
            startDate: {
                type: Date,
                required: true,
            },
            endDate: {
                type: Date,
                required: true,
            },
        },
        destination: {
            type: String,
            required: true,
        },
        ticketBooked:{
            type: Boolean,
            default: false,
        },
        person: {
            adult: {
                type: Number,
                default: 0,
            },
            kid: {
                type: Number,
                default: 0,
            },
        },
        executive: {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        },
        isAccepted: {
            type: Boolean,
            default: false,
        },
        quotations: [
           {
            type:mongoose.Schema.ObjectId,
            ref:"Quotation"
           }
        ],
        status:{
            type:String,
            enum:["Initital", "Hot", "Cold", "Converted", "Not Interested"],
            default:"Initital"
        }
    },
    { timestamps: true }
);

// Add a custom validator to ensure that startDate is less than or equal to endDate
leadSchema.path("travelDate.startDate").validate(function (value) {
    return value <= this.travelDate.endDate;
}, "Start date must be less than or equal to end date.");

module.exports = mongoose.model("Lead", leadSchema);
