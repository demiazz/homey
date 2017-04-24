/* eslint no-underscore-dangle: "off" */

window.useFixture = function addFixture(html) {
  const body = document.querySelector("body");
  const fragment = `<div>${html}</div>`;

  body.insertAdjacentHTML("beforeend", fragment);
};

window.clearFixtures = function clearAllFixtures() {
  const body = document.querySelector("body");

  while (body.firstChild) {
    body.removeChild(body.firstChild);
  }
};

window.__karma__.start = (function jasmineAdapter(originalStartJasmine) {
  return function startJasmine(...args) {
    const originalOnLoadHandler = window.onload;

    window.onload = function handleOnLoad() {
      if (originalOnLoadHandler) {
        originalOnLoadHandler();
      }

      originalStartJasmine(...args);
    };
  };
})(window.__karma__.start);
