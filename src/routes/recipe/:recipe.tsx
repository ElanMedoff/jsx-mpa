import express from "express";
import fs from "fs";
import ReactDOMServer from "react-dom/server";
import { RootLayout } from "../../reusable-components/RootLayout";
import { recipeSchema, RecipeSchema } from "../../utils/schemas";
import { Option } from "../../utils/types";
import React from "react";
import { ErrorModal } from "../../reusable-components/ErrorModal";
import YAML from "yaml";

const router = express.Router();

function Recipe({ recipe }: { recipe: RecipeSchema }) {
  const { categories, ingredients, title, directions, servings } = recipe;

  return (
    <section className="container">
      <h1>{title}</h1>
      {categories.map((category) => {
        return (
          <mark key={category} style={{ marginRight: "var(--pico-spacing)" }}>
            {category}
          </mark>
        );
      })}
      <span>
        <strong>{servings}</strong> serving{servings === 1 ? "" : "s"}
      </span>
      <hr />
      <article>
        <details open>
          <summary>Ingredients</summary>
          <ul>
            {ingredients.map((ingredient, index) => {
              if (typeof ingredient === "string") {
                return <li key={index}>{ingredient}</li>;
              }
              return (
                <li key={index}>
                  <a href={`/recipe/${ingredient.link}`}>{ingredient.name}</a>
                </li>
              );
            })}
          </ul>
        </details>
        <hr />
        <details open>
          <summary>Directions</summary>
          <fieldset>
            {directions.map((direction, index) => {
              return (
                <label key={index}>
                  <input type="checkbox" name={direction} />
                  {direction}
                </label>
              );
            })}
          </fieldset>
        </details>
      </article>
    </section>
  );
}

function getProps(recipe: string): Option<RecipeSchema> {
  const recipePath = `recipes/${recipe}.yaml`;
  if (!fs.existsSync(recipePath)) {
    return {
      type: "error",
      data: null,
      error: "Invalid recipe path",
    };
  }

  const content = fs.readFileSync(recipePath).toString();
  const rawYaml: unknown = YAML.parse(content);
  const parsed = recipeSchema.safeParse(rawYaml);
  if (!parsed.success) {
    return {
      type: "error",
      data: null,
      error: parsed.error.message,
    };
  }

  return {
    type: "success",
    data: parsed.data,
    error: null,
  };
}

router.get("/recipe/:recipe", (req, res) => {
  const props = getProps(req.params.recipe);

  if (props.type === "error") {
    res.status(500).send(
      ReactDOMServer.renderToString(
        <RootLayout>
          <ErrorModal error={props.error} />;
        </RootLayout>
      )
    );
    return;
  }

  res.send(
    ReactDOMServer.renderToString(
      <RootLayout>
        <Recipe recipe={props.data} />
      </RootLayout>
    )
  );
});

export default router;
