const app = require("./app");
const { config } = require("./config");

app.listen(config.PORT, () => {
  console.log(`server has started on http://localhost:${config.PORT}`);
});
