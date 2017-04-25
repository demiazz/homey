/* eslint no-underscore-dangle: "off" */

window.useFixture = function addFixture(html) {
  document.querySelector("body").insertAdjacentHTML("beforeend", html);
};

window.clearFixtures = function clearAllFixtures() {
  document.querySelector("body").innerText = "";
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
