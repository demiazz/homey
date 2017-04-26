import { matches, parentsBy } from "../src";

describe("parentsBy", () => {
  afterEach(clearFixtures);

  describe("when selector is given", () => {
    it("returns all parents which matches by selector", () => {
      useFixture(
        `
        <div class="outer-wrapper">
          <div class="parent">
            <div class="inner-wrapper">
              <div class="root"></div>
            </div>
          </div>
        </div>
      `
      );

      const subject = document.querySelector(".root");

      expect(parentsBy(".parent", subject)).toEqual([
        document.querySelector(".parent")
      ]);
    });

    it("returns empty array if element hasn't any parent which matches by selector", () => {
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

      expect(parentsBy(".parent", subject)).toEqual([]);
    });
  });

  describe("when predicate is given", () => {
    it("returns all parents which matches by predicate", () => {
      useFixture(
        `
        <div class="outer-wrapper">
          <div class="parent">
            <div class="inner-wrapper">
              <div class="root"></div>
            </div>
          </div>
        </div>
      `
      );

      const subject = document.querySelector(".root");
      const predicate = e => matches(".parent", e);

      expect(parentsBy(predicate, subject)).toEqual([
        document.querySelector(".parent")
      ]);
    });

    it("returns empty array if element hasn't any parent which matches by predicate", () => {
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
      const predicate = e => matches(".parent", e);

      expect(parentsBy(predicate, subject)).toEqual([]);
    });
  });
});
