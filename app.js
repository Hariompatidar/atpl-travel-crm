const express= require('express')
const app= express();
const errorMiddleware=require('./middleware/error')
const userRoutes= require('./routes/userRoutes')
const destinationRoutes= require('./routes/destinationRoutes')
const leadRoutes= require("./routes/leadRoutes")
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

const cors = require('cors');

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);

// adding the routes with path mounting
app.use('/api/v1',userRoutes);
app.use('/api/v1', destinationRoutes);
app.use('/api/v1', leadRoutes);

// middleware for handling the errors
app.use(errorMiddleware);

module.exports= app;