require("dotenv").config();
const express = require("express");
const server = express();
// Mongoose imports/requires
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const userRouter = require("./routes/user").router;

const port = process.env.PORT || 8080;

// Database connection
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("database is connected");
}

server.use(cors());
server.use(express.json()); // Body parser middleware
server.use(express.static(path.resolve(__dirname, process.env.PUBLIC_DIR))); // serving static files to display built or compiled react project
server.use("/contacts", userRouter);
//// For Debugging
// server.use("/dist", (req, res) => {
//   res.status(200).json({ status: "loaded to /dist" });
// });
// enabling routing to frontend / react routes
server.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, process.env.PUBLIC_DIR, "index.html"));
});

server.listen(port, (req, res) => {
  console.log(`Server is running`);
  // console.log(staticPath); // For checking the path
});

module.exports = server;
