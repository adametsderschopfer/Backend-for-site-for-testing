import http from "http";
import mongoose from "mongoose";
import BlueBird from "bluebird";
import chalk from "chalk";

import app from "./src/index";
import { port, mongoLogin, mongoPassword, dbName } from "./src/utils/config";

const log = console.log;
mongoose.Promise = BlueBird;

(async function () {
  const options = { useNewUrlParser: true, useUnifiedTopology: true };

  try {
    await mongoose.connect(
      `mongodb+srv://${mongoLogin}:${mongoPassword}@cluster0.ns0qa.mongodb.net/${dbName}?retryWrites=true&w=majority`,
      options
    );

    startServer();
  } catch (error) {
    log(chalk.white.bgRed(error));
    process.exit(1);
  }
})();

function startServer() {
  return http.createServer(app).listen(port, function () {
    log(chalk.black.bgGreen.italic(`SERVER HAS BEEN STARTED ON PORT: ${port}`));
  });
}
