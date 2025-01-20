import express from "express";
import { clientPackages } from "./client-packages/index";
import recipeRecipeRoute from "./routes/recipe/:recipe";
import recipesRoute from "./routes/recipes/route";

const app = express();
const port = 5858;

app.use(express.urlencoded({ extended: true }));

clientPackages.forEach(({ path }) => {
  app.use(path, express.static(path.slice(1)));
});

app.use("/dist-client", express.static("dist-client"));
app.use("/", recipeRecipeRoute);
app.use("/", recipesRoute);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
