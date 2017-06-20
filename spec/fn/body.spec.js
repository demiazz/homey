import body from "../../src/fn/body";

describe("fn/body", () => {
  it("alias to `window.document.body`", () => {
    expect(body).toBe(document.body);
  });
});
