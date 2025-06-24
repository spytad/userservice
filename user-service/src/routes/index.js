const fs = require("fs");
const path = require("path");

module.exports = (app) => {
  fs.readdirSync(__dirname).forEach((file) => {
    if (file !== "index.js" && file.endsWith(".js")) {
      const route = require(path.join(__dirname, file));
      const basePath = `/api/${file.replace("Routes.js", "").toLowerCase()}`;
      console.log(`🔗 Mounting ${file} → ${basePath}`);
      app.use(basePath, route);
    }
  });
};
