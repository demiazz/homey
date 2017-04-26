import { query } from "../src";

describe("query", () => {
  afterEach(clearFixtures);

  it("returns first child which matched by selector", () => {
    useFixture(
      `
      <div class="root" >
        <div class="matched"></div>
        <div class="other"></div>
      </div>
      <div class="matched"></div>
    `
    );

    const subject = document.querySelector(".root");

    expect(query(".matched", subject)).toBe(subject.querySelector(".matched"));
  });

  it("returns null when child which matched by selector not exists", () => {
    useFixture(
      `
      <div class="root" >
        <div class="notMatched"></div>
      </div>
      <div class="matched"></div>
    `
    );

    const subject = document.querySelector(".root");

    expect(query(".matched", subject)).toBe(null);
  });

  describe("when element not given", () => {
    it("returns first child matched by selector in document", () => {
      useFixture(
        `
        <div class="wrapper">
          <div class="root"></div>
        </div>
      `
      );

      const subject = document.querySelector(".root");

      expect(query(".root")).toBe(subject);
    });
  });
});
