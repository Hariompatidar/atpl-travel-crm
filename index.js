// const app= require('./app');
// const { dbconnect } = require('./config/database');
// require('dotenv').config();
// const cors= require('cors');

// app.use(
//   cors({
//       origin:"http://localhost:3000"
//   })
// )

// // Handling Uncaught Exception
// process.on("uncaughtException", (err) => {
//     console.log(`Error: ${err.message}`);
//     console.log(`Shutting down the server due to Uncaught Exception`);
//     process.exit(1);
//   });


// // connect with database
// dbconnect();

// const server = app.listen(process.env.PORT, () => {
//     console.log(`Server is working on http://localhost:${process.env.PORT}`);
//   });
  
//   // Unhandled Promise Rejection
//   process.on("unhandledRejection", (err) => {
//     console.log(`Error: ${err.message}`);
//     console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  
//     server.close(() => {
//       process.exit(1);
//     });
//   });

const app = require('./app');
const { dbconnect } = require('./config/database');
require('dotenv').config();



// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

// Connect with the database
dbconnect();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
