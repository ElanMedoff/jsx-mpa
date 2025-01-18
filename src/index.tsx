import express from "express";
import recipeRecipeRoute from "./routes/recipe/:recipe";
import recipesRoute from "./routes/recipes/route";

const app = express();
const port = 5858;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static("dist-client"));

app.use("/", recipeRecipeRoute);
app.use("/", recipesRoute);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
