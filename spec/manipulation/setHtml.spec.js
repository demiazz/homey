import { setHtml } from "../../src";

describe("setHtml", () => {
  afterEach(clearFixtures);

  it("sets inner html for given element", () => {
    useFixture(`
      <div class="root">
        <div class="before"></div>
      </div>
    `);

    const subject = document.querySelector(".root");

    expect(subject.querySelector(".before")).not.toBe(null);
    expect(subject.querySelector(".after")).toBe(null);

    setHtml(subject, `<div class="after"></div>`);

    expect(subject.querySelector(".before")).toBe(null);
    expect(subject.querySelector(".after")).not.toBe(null);
  });
});
