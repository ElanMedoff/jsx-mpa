import React from "react";
import path from "path";

export function ClientJs({ dirname, filename }: { dirname: string; filename?: string }) {
  const distServerIndex = dirname.indexOf("dist-server");
  if (distServerIndex === -1) {
    throw new Error("`dist-server` not a substring of the `dirname` prop");
  }
  const dirnameReplaced = dirname.slice(distServerIndex).replace("dist-server", "/dist-client");
  const scriptPath = path.resolve(dirnameReplaced, `${filename ?? "index.client.js"}`);

  return <script async type="module" src={scriptPath} />;
}
