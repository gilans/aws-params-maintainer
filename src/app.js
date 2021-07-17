const express = require("express");
const path = require("path");
const public = path.join(__dirname, "public");

const { getAllPaths, getParametersByPath } = require("./create-parameters");
async function buildApp() {
  const app = express();

  app.get("/", async (req, res) => {
    res.sendFile(path.join(public, "index.html"));
  });

  app.get("/params", async (req, res) => {
    const paths = await getAllPaths();
    res.send(paths);
  });
  app.get("/params/:path", async (req, res) => {
    const { path } = req.params;
    const parameters = await getParametersByPath(path);

    res.send(parameters);
  });
  app.use("/", express.static(public));
  return app;
}

module.exports = buildApp;
