const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Lead = require("../models/Lead");
const User = require("../models/User");
const Quotation = require("../models/Quotation");
const Destination = require("../models/Destination");
const ErrorHandler = require("../utils/errorhandler");
const Comment = require("../models/Comment");
const Followup = require("../models/Followup");

// Create New Lead
exports.newLead = catchAsyncErrors(async (req, res, next) => {
    const { name, email, number, startDate, endDate,ticketBooked, destination, adult, kid } =
        req.body;

    const dest = await Destination.findOne({ name: destination });

    if (!dest) {
        return next(
            new ErrorHandler(
                "Destination not found, please select an appropriate destination",
                404
            )
        );
    }

    let executives = await User.find({
        role: "sales",
        destination: dest._id,
    });

    let executiveToAssign;
    if (executives && executives.length > 0) {
        const nextIndex = dest.nextIndex || 0;
        executiveToAssign = executives[nextIndex];
        dest.nextIndex = (nextIndex + 1) % executives.length;
        executiveToAssign.addedLeads.push(executiveToAssign._id);
        await executiveToAssign.save();
    }

    const newLead = new Lead({
        name,
        email,
        number,
        travelDate: {
            startDate,
            endDate,
        },
        destination: dest._id,
        ticketBooked,
        person: {
            adult,
            kid,
        },
        executive: executiveToAssign ? executiveToAssign._id : null,
    });

    await newLead.save();
    await dest.save();

    res.status(200).json({
        success: true,
        message:
            "Your response is recorded successfully, we will contact you soon",
    });
});

// Get all leads
exports.getAllLeads = catchAsyncErrors(async (req, res, next) => {
    const leads = await Lead.find();

    return res.status(200).json({
        success: true,
        leads,
    });
});

// get a lead by id
exports.getLead = catchAsyncErrors(async (req, res, next) => {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
        return next(new ErrorHandler("Lead not found", 404));
    }

    return res.status(200).json({
        success: true,
        lead,
    });
});

// delete Lead-- ADMIN
exports.deleteLead = catchAsyncErrors(async (req, res, next) => {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
        return next(new ErrorHandler("Lead not found", 404));
    }
    await lead.remove();
    return res.status(200).json({
        success: true,
        message: "Lead deleted successfully",
    });
});

// get Users lead
exports.getUserLeads = catchAsyncErrors(async (req, res, next) => {
    const userData = await User.findById(req.user.id).populate("addedLeads");

    if (!userData) {
        return next(new ErrorHandler("User not found", 404));
    }

    return res.status(200).json({
        success: true,
        leads: userData.addedLeads,
    });
});

// except lead
exports.acceptLead = catchAsyncErrors(async (req, res, next) => {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
        return next(new ErrorHandler("Lead does not found"), 404);
    }

    const user = await User.findOne({ _id: req.user.id, addedLeads: lead._id });

    if (!user) {
        return next(
            new ErrorHandler(
                "You do not have permission to accept this lead",
                403
            )
        );
    }

    lead.isAccepted = true;

    await lead.save();

    return res.status(200).json({
        success: true,
        message: "Lead Accepted",
    });
});

// Change the sales executive on the lead ---- ADMIN
exports.changeExecutiveOnLead = catchAsyncErrors(async (req, res, next) => {
    const leadId = req.params.id;
    const newExecutiveId = req.body.newExecutiveId;

    const lead = await Lead.findById(leadId);
    if (!lead) {
        return next(new ErrorHandler("Lead does not found", 404));
    }

    if (lead.executive.toString() === newExecutiveId) {
        return next(
            new ErrorHandler("Lead already assigned to this sales executive"),
            400
        );
    }

    // Find the old sales executive
    const oldExecutive = await User.findById(lead.executive);
    if (oldExecutive) {
        const oldExecutiveIndex = oldExecutive.addedLeads.indexOf(leadId);
        if (oldExecutiveIndex !== -1) {
            oldExecutive.addedLeads.splice(oldExecutiveIndex, 1);
            await oldExecutive.save();
        }
    }

    // Update the lead's executive and isAccepted status
    lead.executive = newExecutiveId;
    lead.isAccepted = false;

    // Find and add the lead to the new sales executive's addedLeads array
    const newExecutive = await User.findById(newExecutiveId);
    if (newExecutive) {
        newExecutive.addedLeads.push(leadId);
        await newExecutive.save();
    }

    // Save the updated lead
    await lead.save();

    res.status(200).json({
        success: true,
        message: "Sales executive on the lead changed successfully",
    });
});

// change lead status
exports.changeLeadStatus = catchAsyncErrors(async (req, res, next) => {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
        return next(new ErrorHandler("Lead not found", 404));
    }

    lead.status = req.body.status;

    await lead.save();

    return res.status(200).json({
        success: true,
        message: "Lead status changed.",
    });
});

// Create a new Quotation
exports.createNewQuotation = catchAsyncErrors(async (req, res, next) => {
    const lead = await Lead.findById(req.params.id);

    const {
        description,
        amount,
        createdBy,
        destination,
        departureDate,
        returnDate,
        notes,
    } = req.body;

    const newQuotation = new Quotation({
        description,
        amount,
        createdBy,
        destination,
        departureDate,
        returnDate,
        notes,
    });

    const savedQuot = await newQuotation.save();

    lead.quotations.push(savedQuot._id);
    await lead.save();

    res.status(201).json({
        success: true,
        message: "Quotation created successfully and added to lead",
        quotation: newQuotation,
    });
});

// Update a Quotation
exports.updateQuotation = catchAsyncErrors(async (req, res, next) => {
    const updatedQuotation = await Quotation.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true,
        }
    );

    if (!updatedQuotation) {
        return next(new ErrorHandler("Quotation not found", 404));
    }

    res.status(200).json({
        success: true,
        message: "Quotation updated successfully",
        quotation: updatedQuotation,
    });
});

// Delete a Quotation
exports.deleteQuotation = catchAsyncErrors(async (req, res, next) => {
    const quotation = await Quotation.findById(req.params.id);

    if (!quotation) {
        return next(new ErrorHandler("Quotation not found", 404));
    }

    await quotation.remove();

    // ##################################
    // ##################################

    // REMOVE ID OF QUOTATION FROM LEAD ALSO

    // ##################################
    // ##################################

    res.status(200).json({
        success: true,
        message: "Quotation deleted successfully",
    });
});

// Create a comment
exports.createComment = catchAsyncErrors(async (req, res, next) => {
    const { user, text } = req.body;

    let comment = await Comment.findOne({ lead: req.params.id });

    if (comment) {
        comment.comments.push({
            user,
            text,
            time: new Date(),
        });
        await comment.save();
    } else {
        comment = await Comment.create({
            lead: req.params.id,
            comments: [
                {
                    user,
                    text,
                    time: new Date(),
                },
            ],
        });
    }

    return res.status(200).json({
        success: true,
        comment,
    });
});

// get comments of a lead
exports.getAllComments = catchAsyncErrors(async (req, res, next) => {
    const comment = await Comment.findOne({ lead: req.params.id });

    return res.status(200).json({
        success: true,
        comment,
    });
});

// Delete a comment by ID
exports.deleteComment = catchAsyncErrors(async (req, res, next) => {
    const comment = await Comment.findOne({ lead: req.params.id });

    if (!comment) {
        return next(new ErrorHandler("No comments found", 404));
    }

    const commentIndex = comment.comments.findIndex(
        (comment) => comment._id == req.body.commentId
    );

    if (commentIndex === -1) {
        return next(new ErrorHandler("Comment not found", 404));
    }

    comment.comments.splice(commentIndex, 1);
    await comment.save();

    return res.status(200).json({
        success: true,
        message: "Comment deleted successfully",
    });
});

// Create a new follow-up or add more follow-up
exports.createOrAddFollowup = catchAsyncErrors(async (req, res) => {
    const followupSection = await Followup.findOne({ lead: req.params.id });

    if (!followupSection) {
        const newFollowupSection = new Followup({
            lead: req.params.leadId,
            details: [req.body],
        });
        const savedFollowupSection = await newFollowupSection.save();
        res.status(201).json(savedFollowupSection);
    } else {
        followupSection.details.push(req.body);
        await followupSection.save();
        res.status(200).json({
            success: true,
            followupSection,
        });
    }
});

// Get the follow-up section for a specific lead
exports.getFollowupSection = catchAsyncErrors(async (req, res) => {
    const followupSection = await Followup.findOne({ lead: req.params.leadId });
    if (!followupSection) {
        return next(new ErrorHandler("No followups found", 404));
    }
    return res.status(200).json({
        success: true,
        followupSection,
    });
});

// Update a specific follow-up detail within the follow-up section
exports.updateFollowupDetail = catchAsyncErrors(async (req, res) => {
    const followupSection = await Followup.findOne({ lead: req.params.leadId });
    if (!followupSection) {
        return next(
            new ErrorHandler("Follow-up section not found for the lead", 404)
        );
    } else {
        const detailIndex = followupSection.details.findIndex(
            (detail) => detail._id == req.params.detailId
        );
        if (detailIndex === -1) {
            return next(new ErrorHandler("Follow-up detail not found", 404));
        } else {
            followupSection.details[detailIndex] = req.body;
            await followupSection.save();
            res.status(200).json({
                success: true,
                followupSection,
            });
        }
    }
});

// Delete a specific follow-up detail within the follow-up section
exports.deleteFollowupDetail = catchAsyncErrors(async (req, res) => {
    const followupSection = await Followup.findOne({ lead: req.params.leadId });
    if (!followupSection) {
        return next(
            new ErrorHandler("Follow-up section not found for the lead", 404)
        );
    } else {
        const detailIndex = followupSection.details.findIndex(
            (detail) => detail._id == req.params.detailId
        );
        if (detailIndex === -1) {
            return next(new ErrorHandler("Follow-up detail not found", 404));
        } else {
            followupSection.details.splice(detailIndex, 1);
            await followupSection.save();
            res.status(200).json({
                success: true,
                followupSection,
            });
        }
    }
});

// Delete the entire follow-up section for a lead
exports.deleteFollowupSection = catchAsyncErrors(async (req, res) => {
    const deletedFollowupSection = await Followup.findOneAndRemove({
        lead: req.params.leadId,
    });
    if (!deletedFollowupSection) {
        return next(
            new ErrorHandler("Follow-up section not found for the lead", 404)
        );
    } else {
        res.status(200).json({
            success: true,
            message: "Follow-up section deleted successfully",
        });
    }
});
