import { matches } from "../src";

describe("matches", () => {
  afterEach(clearFixtures);

  it("returns true if element matched by selector", () => {
    useFixture(`<div class="root matched"></div>`);

    const subject = document.querySelector(".root");

    expect(matches(subject, ".matched")).toBe(true);
  });

  it("returns false if element not matches by selector", () => {
    useFixture(`<div class="root"></div>`);

    const subject = document.querySelector(".root");

    expect(matches(subject, ".matched")).toBe(false);
  });
});
