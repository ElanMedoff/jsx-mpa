interface FetchPartialOptions {
  url: string;
  method: "GET";
  target: string;
  event: Event;
}

export async function fetchPartial(options: FetchPartialOptions) {
  const { url, method, target, event } = options;
  event.preventDefault();

  const res = await fetch(url, {
    method,
    headers: {
      "x-fetch-partial": "1",
    },
  });
  const html = await res.text();
  const el = document.querySelector(`#${target}`);
  if (!el) {
    throw new Error(`No target found for id: ${target}`);
  }
  el.innerHTML = html;
  window.history.pushState({}, "", url);
}
