function initFocus() {
  const input = document.querySelector("input");
  if (!input) return;
  input.focus();
  const inputVal = input.value;
  input.value = "";
  input.value = inputVal;
}

(function init() {
  initFocus();
})();
