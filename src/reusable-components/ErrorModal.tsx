import React from "react";

export function ErrorModal({ error }: { error: string }) {
  console.error(error);
  return (
    <dialog open>
      <article>
        <header>
          <h1 className="pico-color-red-500">error!</h1>
        </header>
        <p>{error}</p>
      </article>
    </dialog>
  );
}
