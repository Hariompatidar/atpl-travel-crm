const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const crypto= require('crypto')

const userSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: [true, "Please Enter Your Name"],
            maxLength: [30, "Name cannot exceed 30 characters"],
            minLength: [4, "Name should have more than 4 characters"],
        },
        lastname: {
            type: String,
            required: [true, "Please Enter Your Name"],
            maxLength: [30, "Name cannot exceed 30 characters"],
            minLength: [4, "Name should have more than 4 characters"],
        },
        email: {
            type: String,
            required: [true, "Please Enter Your Email"],
            unique: true,
            validate: [validator.isEmail, "Please Enter a valid Email"],
        },
        password: {
            type: String,
            required: [true, "Please Enter Your Password"],
            minLength: [8, "Password should be greater than 8 characters"],
            select: false,
        },
        role: {
            type: String,
            enum: ["admin", "executive", "operation", "accounts"],
            required: [true, "Role is required"],
        },
        profileImage: {
            type: String,
        },
        number: {
            type: String,
            maxLength: [10, "Number may not exceed 10 digits"],
            minLength: [10, "Number length must be of 10 digits"],
        },
        destination: [
            {
                type: mongoose.Schema.ObjectId,
                ref:"Destination",
                required: [true, "Please select at least one destination"],
            },
        ],
        addedLeads: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Lead",
            },
        ],
        // notifications: [
        //     {
        //         type: mongoose.Schema.Types.ObjectId,
        //         ref: "Notification",
        //     },
        // ],
        resetPasswordToken: String,
        resetPasswordExpire: Date,
    },
    { timestamps: true }
);

// hashing password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

// JWT token
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// Compare Password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
    // Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
};

module.exports = mongoose.model("User", userSchema);
