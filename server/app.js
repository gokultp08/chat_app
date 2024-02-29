const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const errorCatcher = require("./helpers/errorCatcher");
const logger = require("./helpers/logger");
dotenv.config({ path: ".env" });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const API_PREFIX = "/api/v1/";

app.use(`${API_PREFIX}health`, (req, res) => {
  logger.info("Server is running");
  res.status(200).send("OK");
});

app.use(`${API_PREFIX}user`, require("./routes/user"));
app.use(`${API_PREFIX}post`, require("./routes/post"));
app.use(`${API_PREFIX}comment`, require("./routes/comment"));

app.use(errorCatcher);

module.exports = app;
