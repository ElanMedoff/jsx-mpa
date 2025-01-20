import React, { ReactNode } from "react";
import { clientPackages } from "../client-packages";

export function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Base-bones HTML5</title>
        {clientPackages.map(({ type, path }) => {
          switch (type) {
            case "css": {
              return <link rel="stylesheet" href={path} />;
            }

            case "js": {
              return;
            }
          }
        })}
      </head>
      <body>
        <Header />
        {children}
        <noscript>JavaScript is not enabled.</noscript>
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
