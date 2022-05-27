const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const expressBearerTokenMiddleware = require("express-bearer-token");
const morganBody = require("morgan-body");
const middlewares = require("./src/middlewares");
const path = require("path");

app.use(cors({ origin: "*" }));
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(expressBearerTokenMiddleware());

//SETUP BASIC MIDDLEWARE
morganBody(app, {
  //logRequestBody: false,
  logResponseBody: false,
});

app.use(middlewares.basic.setupMiddleware);
// app.use(middlewares.auth.jwtVerify);


// api route
const autoRoutes = require("express-auto-routes")(app);
autoRoutes(path.join(__dirname, "./src/controllers"));

app.use(middlewares.basic["404Middleware"]);
app.use(middlewares.basic.errorMiddleware);
module.exports = app;
