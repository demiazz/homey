import { queryAll } from "../src";

describe("queryAll", () => {
  afterEach(clearFixtures);

  it("returns array of childs which matched by selector", () => {
    useFixture(
      `
      <div class="root" >
        <div class="matched"></div>
        <div class="matched"></div>
        <div class="notMatched"></div>
      </div>
      <div class="matched"></div>
      <div class="matched"></div>
    `
    );

    const subject = document.querySelector(".root");

    expect(queryAll(".matched", subject)).toEqual(
      [].slice.call(document.querySelectorAll(".root .matched"))
    );
  });

  it("returns empty array when children which matched by selector not existed", () => {
    useFixture(
      `
      <div class="root" >
        <div class="notMatched"></div>
      </div>
      <div class="matched"></div>
      <div class="matched"></div>
    `
    );

    const subject = document.querySelector(".root");

    expect(queryAll(".matched", subject)).toEqual([]);
  });

  describe("when element not given", () => {
    it("returns array of childs which matched by selector", () => {
      useFixture(
        `
        <div class="wrapper">
          <div class="root"></div>
        </div>
        <div class="root"></div>
      `
      );

      expect(queryAll(".root")).toEqual(
        [].slice.call(document.querySelectorAll(".root"))
      );
    });
  });
});
