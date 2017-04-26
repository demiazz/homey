import { parentBy } from "../src";

describe("parentBy", () => {
  afterEach(clearFixtures);

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
