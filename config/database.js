const mongoose= require('mongoose')

exports.dbconnect=()=>{
    mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>{
        console.log("Database connected successfully");
    }).catch((error)=>{
        console.log(error);
        console.log("Error in connecting database");
        process.exit(1);
    })
}