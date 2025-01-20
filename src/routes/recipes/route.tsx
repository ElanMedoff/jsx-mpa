import fs from "fs";
import fuzzy from "fuzzy";
import { Option } from "../../utils/types";
import React, { Fragment } from "react";
import express from "express";
import { Script } from "../../reusable-components/Script";
import { renderErrorModalToString, wrappedRenderToString } from "../../utils/wrappedRenderToString";
import { recipeSchema, RecipeSchema } from "../../utils/schemas";
import path from "path";
import YAML from "yaml";

const router = express.Router();

function RecipesPerCategory({ recipes }: { recipes: RecipeSchema[] }) {
  const categoriesWithDuplicates = recipes.map(({ categories }) => categories).flat();
  const categories = Array.from(new Set(categoriesWithDuplicates)).sort();

  const getRecipesPerCategory = ({
    category,
    recipes,
  }: {
    category: RecipeSchema["categories"][number];
    recipes: RecipeSchema[];
  }) => {
    return recipes.filter((recipe) => recipe.categories.includes(category));
  };

  return (
    <>
      {categories.map((category, index) => {
        return (
          <Fragment key={index}>
            {index === 0 ? null : <hr />}
            <details open>
              <summary style={{ textTransform: "capitalize" }}>{category}</summary>
              {getRecipesPerCategory({ category, recipes }).map((recipe, index) => {
                return (
                  <div key={index}>
                    <a href={`/recipe/${recipe.slug}`}>{recipe.title}</a>
                  </div>
                );
              })}
            </details>
          </Fragment>
        );
      })}
    </>
  );
}

function RecipesPerSearch({ searchInput, recipes }: { searchInput: string; recipes: RecipeSchema[] }) {
  const fuzzyRecipes = fuzzy.filter(searchInput, recipes, {
    extract: (recipe) => recipe.title,
    pre: "<span style='color: var(--pico-color-red-500)'>",
    post: "</span>",
  });

  return (
    <ul>
      {fuzzyRecipes.map((fuzzyRecipe, index) => {
        return (
          <li key={index}>
            <a href={`/recipe/${fuzzyRecipe.original.slug}`} dangerouslySetInnerHTML={{ __html: fuzzyRecipe.string }} />
          </li>
        );
      })}
      {fuzzyRecipes.length === 0 && <div>No results</div>}
    </ul>
  );
}

function Recipes({ recipes }: { recipes: RecipeSchema[] }) {
  return (
    <>
      <Script dirname={__dirname} />
      <section className="container">
        <nav>
          <h1>All Recipes</h1>
        </nav>
        <hr />
        <form>
          <input type="search" placeholder="Search" name="search" />
          <article>
            <RecipesPerCategory recipes={recipes} />
          </article>
        </form>
      </section>
    </>
  );
}

function getProps(): Option<RecipeSchema[]> {
  const files = fs.readdirSync("db");
  const recipes: RecipeSchema[] = [];

  for (const file of files) {
    const filePath = path.join("db", file);
    const content = fs.readFileSync(filePath).toString();

    const rawYaml: unknown = YAML.parse(content);
    const parsed = recipeSchema.safeParse(rawYaml);
    if (!parsed.success) {
      return {
        type: "error",
        data: null,
        error: parsed.error.message,
      };
    }

    recipes.push(parsed.data);
  }

  return {
    type: "success",
    data: recipes,
    error: null,
  };
}

router.get("/recipes", (_, res) => {
  const props = getProps();

  if (props.type === "error") {
    res.status(500).send(renderErrorModalToString(props.error));
    return;
  }

  res.send(wrappedRenderToString(<Recipes recipes={props.data} />));
});

export default router;
