import { removeAttr } from "../../src";

describe("removeAttr", () => {
  afterEach(clearFixtures);

  it("removes attribute from element", () => {
    useFixture(`<div class="root"></div>`);

    const subject = document.querySelector(".root");

    expect(subject.hasAttribute("class")).toBe(true);

    removeAttr(subject, "class");

    expect(subject.hasAttribute("class")).toBe(false);
  });

  it("do nothing if element hasn't attribute with a given name", () => {
    useFixture(`<div class="root"></div>`);

    const subject = document.querySelector(".root");

    expect(subject.hasAttribute("id")).toBe(false);

    expect(() => removeAttr(subject, "id")).not.toThrow();
  });
});
