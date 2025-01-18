import React, { ReactNode } from "react";

export function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Base-bones HTML5</title>
        <link rel="stylesheet" href="/css/pico.min.css" />
        <link rel="stylesheet" href="/css/pico.colors.min.css" />
      </head>
      <body>
        <nav className="container">
          <ul>
            <li>
              <a href="/recipes">
                <strong>Recipe GUI</strong>
              </a>
            </li>
          </ul>
        </nav>
        {children}
        <script type="text/javascript" src="/js/htmx.min.js" />
        <noscript>JavaScript is not enabled.</noscript>
      </body>
    </html>
  );
}
