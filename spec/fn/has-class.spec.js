import hasClass from "../../src/fn/has-class";

describe("fn/has-class", () => {
  afterEach(clearFixtures);

  it("returns true if element has a given class", () => {
    useFixture(`<div class="root foo"></div>`);

    const subject = document.querySelector(".root");

    expect(hasClass(subject, "foo")).toBe(true);
  });

  it("returns false if element hasn't a given class", () => {
    useFixture(`<div class="root"></div>`);

    const subject = document.querySelector(".root");

    expect(hasClass(subject, "foo")).toBe(false);
  });
});
