import ReactDOMServer from "react-dom/server";
import { RootLayout } from "../reusable-components/RootLayout";
import React, { ReactNode } from "react";
import { ErrorModal } from "../reusable-components/ErrorModal";

export function wrappedRenderToString(
  component: ReactNode,
  { isPartial }: { isPartial: boolean } = { isPartial: false }
) {
  if (isPartial) {
    return ReactDOMServer.renderToString(component);
  }
  return ReactDOMServer.renderToString(<RootLayout>{component}</RootLayout>);
}

export function renderErrorModalToString(error: string, { isPartial }: { isPartial: boolean } = { isPartial: false }) {
  if (isPartial) {
    return ReactDOMServer.renderToString(<ErrorModal error={error} />);
  }

  return ReactDOMServer.renderToString(
    <RootLayout>
      <ErrorModal error={error} />
    </RootLayout>
  );
}
