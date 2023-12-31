require("dotenv/config");
const express = require("express");
const cors = require("cors");
const path = require('path');
const { join } = require("path");

const PORT = process.env.PORT || 8000;
const app = express();
app.use(
  cors({
    origin: [
      process.env.WHITELISTED_DOMAIN &&
        process.env.WHITELISTED_DOMAIN.split(","),
    ],
  })
);

app.use(express.json());
const db = require("../models");
// db.sequelize.sync({ alter: true });



//#region API ROUTES

// ===========================
// NOTE : Add your routes here
app.use('/', express.static(path.resolve(__dirname, '../')))
//routes
const { authRouter, adminRouter, empRouter } = require("./routers");

//middleware
app.use("/auth", authRouter);
app.use("/emp", empRouter);
app.use("/admi", adminRouter);


// ===========================

// not found
app.use((req, res, next) => {
  if (req.path.includes("/api/")) {
    res.status(404).send("Not found !");
  } else {
    next();
  }
});

// error
app.use((err, req, res, next) => {
  if (req.path.includes("/api/")) {
    console.error("Error : ", err.stack);
    res.status(500).send("Error !");
  } else {
    next();
  }
});

//#endregion

//#region CLIENT
const clientPath = "../../client/build";
app.use(express.static(join(__dirname, clientPath)));

// Serve the HTML page
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, clientPath, "index.html"));
});

//#endregion

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`);
  } else {
    console.log(`APP RUNNING at ${PORT} ✅`);
  }
});
