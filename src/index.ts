"use strict";

import * as bodyParser from "body-parser";
import express from "express";
import http from "http";
import cors from "cors";
import { mongooseConnection } from "./database";
import * as packageInfo from "../package.json";
import { router } from "./routes";
import { HTTP_STATUS } from "./common";

const app = express();

app.use(cors());
app.use(mongooseConnection);
app.use(bodyParser.json({ limit: "200mb" }));
app.use(bodyParser.urlencoded({ limit: "200mb", extended: true }));

const health = (req, res) => {
  return res.status(200).json({
    message: `Project Name Server is Running, Server health is green`,
    app: packageInfo.name,
    version: packageInfo.version,
    description: packageInfo.description,
    author: packageInfo.author,
    license: packageInfo.license,
  });
};

app.get("/", health);
app.get("/health", health);
app.get("/isServerUp", (req, res) => {
  res.send("Server is running ");
});

app.use(router);

app.use((_, res) => {
  res.status(HTTP_STATUS.NOT_FOUND).json({
    status: HTTP_STATUS.NOT_FOUND,
    message: "Project Name Backend API Bad Gateway",
  });
});

let server = new http.Server(app);
export default server;
