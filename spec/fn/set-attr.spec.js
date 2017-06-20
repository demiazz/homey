import setAttr from "../../src/fn/set-attr";

describe("fn/set-attr", () => {
  afterEach(clearFixtures);

  it("sets attribute to a given value", () => {
    useFixture(`<div class="root"></div>`);

    const subject = document.querySelector(".root");

    setAttr(subject, "id", "root");

    expect(subject.getAttribute("id")).toBe("root");
  });

  it("removes attribute if a given value is `null`", () => {
    useFixture(`<div class="root"></div>`);

    const subject = document.querySelector(".root");

    setAttr(subject, "class", null);

    expect(subject.hasAttribute("class")).toBe(false);
  });
});
