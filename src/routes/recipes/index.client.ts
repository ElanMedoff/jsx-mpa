import { fetchPartial } from "../../utils/partial.client.js";

function initFocus() {
  const input = document.querySelector("input");
  if (!input) return;
  input.focus();
  const inputVal = input.value;
  input.value = "";
  input.value = inputVal;
}

function initEventListeners() {
  const form = document.querySelector("form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    const el = event.target as HTMLElement;
    if (!el) throw new Error("No target associated with the event");
    const action = el.getAttribute("action");
    if (!action) throw new Error("`action` attribute required");

    const formData = new FormData(event.target as HTMLFormElement);
    const searchParams = new URLSearchParams(formData as any).toString();

    fetchPartial({
      url: `${action}${searchParams.length ? "?" : ""}${searchParams}`,
      method: "GET",
      target: "search-results",
      event,
    });
  });
}

(function init() {
  initFocus();
  initEventListeners();
})();
