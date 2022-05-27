#!/usr/bin/env node

/**
 * Module dependencies.
 */
 var app = require("./app");
 var debug = require("debug")("sms:server");
 const env = require('./env')
 
 
 const webServerHttp = require('http');
 const server = webServerHttp.createServer(app);
 
 /**
  * Get port from environment and store in Express.
  */
 var port = normalizePort(env.PORT || "3000");
 app.set("port", port);
 
 
 server.listen(port, () => {
   console.log('--------------------------------')
   console.log(`server started on port ${port}`)
 });
 
 server.on("error", onError);
 server.on("listening", onListening);
 
 /**
  * Normalize a port into a number, string, or false.
  */
 function normalizePort(val) {
   var port = parseInt(val, 10);
 
   if (isNaN(port)) {
     return val;
   }
 
   if (port >= 0) {
     return port;
   }
 
   return false;
 }
 
 /**
  * Event listener for HTTP server "error" event.
  */
 function onError(error) {
   if (error.syscall !== "listen") {
     throw error;
   }
 
   const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
 
   switch (error.code) {
     case "EACCES":
       console.error(bind + " requires elevated privileges");
       process.exit(1);
       break;
     case "EADDRINUSE":
       console.error(bind + " is already in use");
       process.exit(1);
       break;
     default:
       throw error;
   }
 }
 
 /**
  * Event listener for HTTP server "listening" event.
  */
 function onListening() {
   const addr = server.address();
   const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
   debug("Listening on " + bind);
 }
 