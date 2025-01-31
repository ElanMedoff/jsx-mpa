import { z } from "zod";

export const recipeSchema = z.object({
  title: z.string(),
  categories: z.array(z.enum(["italian", "mexican"])),
  ingredients: z.array(
    z.union([
      z.string(),
      z.object({
        name: z.string(),
        link: z.string(),
      }),
    ])
  ),
  directions: z.array(z.string()),
  slug: z.string(),
  servings: z.number(),
});
export type RecipeSchema = z.infer<typeof recipeSchema>;
