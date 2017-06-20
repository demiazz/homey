import html from "../../src/fn/html";

describe("fn/html", () => {
  it("alias to `window.document.documentElement`", () => {
    expect(html).toBe(document.documentElement);
  });
});
