import { remove } from "../../src";

describe("remove", () => {
  afterEach(clearFixtures);

  it("removes element if attached to DOM", () => {
    useFixture(`<div class="root"></div>`);

    const subject = document.querySelector(".root");

    expect(remove(subject)).toBe(true);
    expect(document.querySelector(".root")).toBe(null);
  });

  it("does nothing if element doesn't attached to DOM", () => {
    const subject = document.createElement("div");

    expect(remove(subject)).toBe(false);
  });
});
