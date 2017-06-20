import { hasAttr } from "../../src";

describe("hasAttr", () => {
  afterEach(clearFixtures);

  it("returns true if element has a given attribute", () => {
    useFixture(`<div class="root"></div>`);

    const subject = document.querySelector(".root");

    expect(hasAttr(subject, "class")).toBe(true);
  });

  it("returns false if element hasn't a given attribute", () => {
    useFixture(`<div class="root"></div>`);

    const subject = document.querySelector(".root");

    expect(hasAttr(subject, "id")).toBe(false);
  });
});
