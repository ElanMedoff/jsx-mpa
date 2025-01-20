import React, { ReactNode } from "react";
import { clientPackages } from "../client-packages";

export function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Recipes</title>
        {clientPackages.map(({ type, path }) => {
          switch (type) {
            case "css": {
              return <link rel="stylesheet" href={path} key={path} />;
            }

            case "js": {
              // TODO
              return;
            }
          }
        })}
      </head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}

function Header() {
  return (
    <nav className="container">
      <ul>
        <li>
          <a href="/recipes">
            <strong>Recipes</strong>
          </a>
        </li>
      </ul>
    </nav>
  );
}
