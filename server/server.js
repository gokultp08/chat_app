const app = require("./app");
const { config } = require("./config");
const logger = require("./helpers/logger");

app.listen(config.PORT, () => {
  logger.info(`server has started on http://localhost:${config.PORT}`);
});
