import ReactDOMServer from "react-dom/server";
import { RootLayout } from "../reusable-components/RootLayout";
import React, { ReactNode } from "react";
import { ErrorModal } from "../reusable-components/ErrorModal";

export function wrappedRenderToString(component: ReactNode) {
  return ReactDOMServer.renderToString(<RootLayout>{component}</RootLayout>);
}

export function renderErrorModalToString(error: string) {
  return ReactDOMServer.renderToString(
    <RootLayout>
      <ErrorModal error={error} />
    </RootLayout>
  );
}
