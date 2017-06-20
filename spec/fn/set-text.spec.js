import setText from "../../src/fn/set-text";

describe("fn/set-text", () => {
  afterEach(clearFixtures);

  it("replace element content with given string", () => {
    useFixture(`
      <div class="root">
        <div class="before"></div>
      </div>
    `);

    const subject = document.querySelector(".root");

    expect(subject.querySelector(".before")).not.toBe(null);

    setText(subject, "text content");

    expect(subject.querySelector(".before")).toBe(null);
    expect(subject.textContent).toBe("text content");
  });
});
