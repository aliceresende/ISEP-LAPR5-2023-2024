import "reflect-metadata"; // We need this in order to use @Decorators

import Logger from "./loaders/logger";
import config from "../config";
import express from "express";

async function startServer() {
  const app = express();


  const cors = require("cors");
  app.use(cors(
    {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      allowedHeaders: ["Content-Type", "Authorization"]
    }
  ));

  await require("./loaders").default({ expressApp: app });

  app.listen(config.port, () => {

    console.log("Server listening on port: " + config.port);

    Logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️ 
      ################################################
    `);
  })
    .on("error", (err) => {
      Logger.error(err);
      process.exit(1);
    });
}

startServer()
  .then(() => {
    console.log("Server started");
  });