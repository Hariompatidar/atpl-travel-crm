const Destination= require('../models/Destination');
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorhandler");

// Add new destination
exports.addNewDestination= catchAsyncErrors(async(req,res,next)=>{
    const destination= await Destination.find({name:req.body.name});

    if(destination){
        return next(new ErrorHandler("Destination already present", 400));
    }

    await Destination.create({
        name:req.body.name
    })

    return res.status(200).json({
        success:true,
        message:"Destination added successfully"
    })
})

// Get all destinations
exports.getDestinations= catchAsyncErrors(async(req,res,next)=>{
    const destinations= await Destination.find().sort({name:1});

    return res.status(200).json({
        success:true,
        destinations
    })
})

// Update a destination
exports.updateDestination= catchAsyncErrors(async(req,res,next)=>{

    // check if the new destination is already present with new name
    let destination=await Destination.find({name:req.body.name});
    if(destination){
        return next(new ErrorHandler("Destination already present with this name", 400))
    }

    destination= await Destination.findByIdAndUpdate(req.params.id, {
        name:req.body.name
    });

    if(!destination){
        return next(new ErrorHandler("Destination not found", 404));
    }

    return res.status(200).json({
        success:true,
        message:"Destination updated successfully"
    })
})

// Delete destinatino
exports.deleteDestination= catchAsyncErrors(async(req,res,next)=>{
    const destination= await Destination.findByIdAndDelete(req.params.id);

    if(!destination){
        return next(new ErrorHandler("Destination not found", 404));
    }

    return res.status(200).json({
        success:true,
        message:"Destination deleted successfully"
    })
})