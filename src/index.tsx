import express from "express";
import fs from "fs";
import { clientPackages } from "./client-packages/index";

(async () => {
  const app = express();
  const port = 5858;

  clientPackages.forEach(({ path }) => {
    app.use(path, express.static(path.slice(1)));
  });

  const recursiveFiles = await fs.promises.readdir("dist-server/src/routes", { recursive: true });
  const routeFileNames = recursiveFiles.filter((file) => file.endsWith(".js")); // excludes directories and source maps

  for (const routeFileName of routeFileNames) {
    // dynamic import is running at run-time, so need to use the path of the compiled code
    const module = await import(`./routes/${routeFileName}`);
    app.use("/", module.default.default);
  }

  app.use("/dist-client", express.static("dist-client"));

  app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
  });
})();
