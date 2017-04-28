import { body } from "../src";

describe("body", () => {
  it("alias to `window.document.body`", () => {
    expect(body).toBe(document.body);
  });
});
