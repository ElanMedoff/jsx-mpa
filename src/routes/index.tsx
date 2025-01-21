import express from "express";

const router = express.Router();

router.get("/", (_, res) => {
  res.redirect("/recipes");
});

export default router;
