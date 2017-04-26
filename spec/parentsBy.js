import { parentsBy } from "../src";

describe("parentsBy", () => {
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
