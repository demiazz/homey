import { parent } from "../../src";

describe("parent", () => {
  afterEach(clearFixtures);

  it("returns parent element", () => {
    const rootClass = "root";
    const parentClass = "parent";

    useFixture(`
      <div class="${parentClass}">
        <div class="${rootClass}"></div>
      </div>
    `);

    const subject = document.querySelector(`.${rootClass}`);
    const parentElement = document.querySelector(`.${parentClass}`);

    expect(parent(subject)).toBe(parentElement);
  });

  it("returns null if parent element doesn't exists", () => {
    const subject = document.createElement("div");

    expect(parent(subject)).toBe(null);
  });
});
