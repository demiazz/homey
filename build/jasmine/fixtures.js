window.useFixture = function useFixture(html) {
  document.body.innerHTML = html;
};

window.clearFixtures = function clearFixtures() {
  document.body.innerHTML = "";
};
