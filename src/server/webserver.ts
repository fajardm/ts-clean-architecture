import http from "http";
import express from "express";
import { createTerminus } from "@godaddy/terminus";
import config from "../config";

class Webserver {
  private app = express();
  private server = http.createServer(this.app);

  static run(): void {
    let webServer = new Webserver();

    webServer.app.use(express.urlencoded({ extended: false }));
    webServer.app.use(express.json());

    webServer.app.use((err: any, req: any, res: any, next: any) => {
      if (err) {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        // Set 500 server code error if statuscode not set
        return res.status(err.statusCode).send({
          statusCode: err.statusCode,
          message: err.message,
        });
      }
      next();
    });

    // 404
    webServer.app.use((req, res) => {
      res.status(404).json({
        status: "Page does not exist",
      });
    });

    let onSignal = webServer.onSignal;
    let onShutdown = webServer.onShutdown;

    let options = {
      signal: "SIGINT",
      healthChecks: { "/healthcheck": webServer.healthCheck },
      caseInsensitive: true,
      timout: config.http.gracefullTimeoutInSecond * 1000,
      onSignal,
      onShutdown,
    };

    createTerminus(webServer.server, options);

    // listen port
    webServer.server = webServer.server.listen(config.http.port, () => {
      console.log(`server is listening on ${config.http.port}`);
    });
  }

  private async onSignal() {
    console.log("server is starting cleanup");
  }

  private async onShutdown() {
    console.log("cleanup finished, server is shutting down");
  }

  private async healthCheck() {
    console.log("health check");
  }
}

export default Webserver;
