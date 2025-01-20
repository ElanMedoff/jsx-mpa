import React from "react";
import express from "express";
import { RootLayout } from "../../reusable-components/RootLayout";
import { Script } from "../../reusable-components/Script";
import ReactDOMServer from "react-dom/server";

const router = express.Router();

function Recipes() {
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
          <article id="search-results"></article>
        </form>
      </section>
    </>
  );
}

router.get("/recipes", (_, res) => {
  res.send(
    ReactDOMServer.renderToString(
      <RootLayout>
        <Recipes />
      </RootLayout>
    )
  );
});

export default router;
