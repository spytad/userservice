// src/routes/index.js
const fs = require("fs");
const path = require("path");

module.exports = (app) => {
  fs.readdirSync(__dirname)
    .filter((f) => f !== "index.js" && f.endsWith(".js"))
    .forEach((file) => {
      const router = require(path.join(__dirname, file));
      const base = file.replace("Routes.js", "").toLowerCase();
      console.log(`🔗 Mounting ${file} → /api/${base}`);
      app.use(`/api/${base}`, router);
    });
};
