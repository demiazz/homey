import setHtml from "../../src/fn/set-html";

describe("fn/set-html", () => {
  afterEach(clearFixtures);

  it("replace element content with given html from string", () => {
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
