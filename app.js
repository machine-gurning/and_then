const express = require("express");
const app = express();
const routes = require("./routes/main");
const path = require("path");
const connectDB = require("./db/connect");
require("dotenv").config();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
// Middleware

// Routes
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use("/api/v1", routes);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(5000, () => {
      console.log("heellooo");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
