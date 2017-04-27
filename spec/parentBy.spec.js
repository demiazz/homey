import { matches, parentBy } from "../src";

describe("parentBy", () => {
  afterEach(clearFixtures);

  describe("when selector given", () => {
    it("returns parent element which matches by selector", () => {
      useFixture(
        `
        <div class="parent">
          <div class="wrapper">
            <div class="root"></div>
          </div>
        </div>
      `
      );

      const subject = document.querySelector(".root");

      expect(parentBy(".parent", subject)).toBe(
        document.querySelector(".parent")
      );
    });

    it("returns null if parent element which matches doesn't exists", () => {
      useFixture(
        `
        <div class="outer-wrapper">
          <div class="inner-wrapper">
            <div class="root"></div>
          </div>
        </div>
      `
      );

      const subject = document.querySelector(".root");

      expect(parentBy(".parent", subject)).toBe(null);
    });
  });

  describe("when predicate function is given", () => {
    it("returns parent element which matches by predicate", () => {
      useFixture(
        `
        <div class="parent">
          <div class="wrapper">
            <div class="root"></div>
          </div>
        </div>
      `
      );

      const subject = document.querySelector(".root");
      const predicate = e => matches(e, ".parent");

      expect(parentBy(predicate, subject)).toBe(
        document.querySelector(".parent")
      );
    });

    it("returns null if parent element which matches doesn't exists", () => {
      useFixture(
        `
        <div class="outer-wrapper">
          <div class="inner-wrapper">
            <div class="root"></div>
          </div>
        </div>
      `
      );

      const subject = document.querySelector(".root");
      const predicate = e => matches(e, ".parent");

      expect(parentBy(predicate, subject)).toBe(null);
    });
  });
});
