import React from "react";
import path from "path";

export function Script({ dirname, filename }: { dirname: string; filename?: string }) {
  const dirnameReplaced = dirname.slice(dirname.indexOf("dist-server")).replace("dist-server", "/dist-client");
  const scriptPath = path.resolve(dirnameReplaced, `${filename ?? "index.client.js"}`);
  return <script async type="module" src={scriptPath} />;
}
