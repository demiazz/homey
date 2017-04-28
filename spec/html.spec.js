import { html } from "../src";

describe("html", () => {
  it("alias to `window.document.documentElement`", () => {
    expect(html).toBe(document.documentElement);
  });
});
