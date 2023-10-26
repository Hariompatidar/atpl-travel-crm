const mongoose= require('mongoose');

const commentSchema= new mongoose.Schema({
    lead:{
        type: mongoose.Schema.ObjectId,
        ref:"Lead",
        required:true
    },
    comments:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true
            },
            text:{
                type:String,
            },
            time:{
                type:Date,
                default:Date.now(),
            }
        }
    ]
})

module.exports= mongoose.model("Comment", commentSchema);