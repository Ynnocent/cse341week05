const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoDB = require("./db/connect.js");

require("dotenv").config();

const DB = mongoDB.initDB();

const PORT = process.env.PORT || 3000;
const app = express();

// Server Configuration
app.use(bodyParser.json());
app.use(express.urlencoded());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Origin",
      "application/json",
    ],
  })
);

// Server Routes
app.use("/", require("./routes"));

// Server Init
if (!DB) {
  console.error("error")
} else {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
