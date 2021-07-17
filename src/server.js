const buildApp = require("./app");
require("dotenv").config();

const config = require("./config");
(async () => {
  const app = await buildApp();

  app.listen(config.PORT, () => {
    console.log(`Integrator listening on port: ${config.PORT}`);
  });
})();
