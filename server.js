const express = require('express');
const expressLayouts = require("express-ejs-layouts");
const app = express();
const env = require("dotenv").config();
const static = require("./src/routes/static");
const baseRoute = require('./src/routes/baseRoute');
const mongodb = require("./src/config/mongodb");

/* ********************
local host information
******************** */ 
const PORT = process.env.PORT;
const HOST = process.env.HOST;

/* *******************
connecting the monog db serer
******************** */

mongodb.initDB(function(err) {
  if(err) {
    console.log(err);
  } else {
    app.listen(PORT, () => {
      console.log(`Server running at port :${PORT}`)});
  }
});

app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/layout");

// Routes
app.use(static);
app.use('/', baseRoute);

app.use('/contacts', require('./src/routes/contactsRoute'));

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});
