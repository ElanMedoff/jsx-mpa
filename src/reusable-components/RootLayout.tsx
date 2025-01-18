import React, { ReactNode } from "react";

// TODO: automatically inject script tags based on the packages dir

export function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Base-bones HTML5</title>
        <link rel="stylesheet" href="/packages/pico.min.css" />
        <link rel="stylesheet" href="/packages/pico.colors.min.css" />
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
