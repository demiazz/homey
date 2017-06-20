import matches from "../../src/fn/matches";
import parentBy from "../../src/fn/parent-by";

describe("fn/parent-by", () => {
  afterEach(clearFixtures);

  describe("when selector given", () => {
    it("returns parent element which matches by selector", () => {
      useFixture(`
        <div class="parent">
          <div class="wrapper">
            <div class="root"></div>
          </div>
        </div>
      `);

      const subject = document.querySelector(".root");

      expect(parentBy(subject, ".parent")).toBe(
        document.querySelector(".parent")
      );
    });

    it("returns null if parent element which matches doesn't exists", () => {
      useFixture(`
        <div class="outer-wrapper">
          <div class="inner-wrapper">
            <div class="root"></div>
          </div>
        </div>
      `);

      const subject = document.querySelector(".root");

      expect(parentBy(subject, ".parent")).toBe(null);
    });
  });

  describe("when predicate function is given", () => {
    it("returns parent element which matches by predicate", () => {
      useFixture(`
        <div class="parent">
          <div class="wrapper">
            <div class="root"></div>
          </div>
        </div>
      `);

      const subject = document.querySelector(".root");
      const predicate = e => matches(e, ".parent");

      expect(parentBy(subject, predicate)).toBe(
        document.querySelector(".parent")
      );
    });

    it("returns null if parent element which matches doesn't exists", () => {
      useFixture(`
        <div class="outer-wrapper">
          <div class="inner-wrapper">
            <div class="root"></div>
          </div>
        </div>
      `);

      const subject = document.querySelector(".root");
      const predicate = e => matches(e, ".parent");

      expect(parentBy(subject, predicate)).toBe(null);
    });
  });
});
