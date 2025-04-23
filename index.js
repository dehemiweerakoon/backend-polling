const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const Debugger = require("debug")("app:startup");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const db = require("./models/tables");

if (app.get("env") == "development") {
  app.use(morgan("tiny"));
  Debugger("Morgan Enabled");
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(express.static("public"));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-type,x-auth-token");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

/* The commented out code `db.sequelize.sync({ force: true })` is a Sequelize method used to
synchronize the models defined in your application with the actual database tables. */
db.sequelize
  .sync({ alter: true }) // force : true means that drop tables // alter:true means that update changes only there is in table changes ....
  .then(() => {
    console.log("Db synced");
  })
  .catch(() => {
    console.log("Fail to sync DB");
  });

require("./startup/routes")(app);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
