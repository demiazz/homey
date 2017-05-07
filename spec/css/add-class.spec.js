import { addClass } from "../../src";

describe("addClass", () => {
  afterEach(clearFixtures);

  it("adds given class to element if element hasn't given class already", () => {
    useFixture(`<div class="root"></div>`);

    const subject = document.querySelector(".root");

    expect(subject.classList.contains("foo")).toBe(false);
    expect(addClass(subject, "foo")).toBe(true);
    expect(subject.classList.contains("foo")).toBe(true);
  });

  it("do nothing if element has given class already", () => {
    useFixture(`<div class="root foo"></div>`);

    const subject = document.querySelector(".root");

    expect(subject.classList.contains("foo")).toBe(true);
    expect(addClass(subject, "foo")).toBe(false);
    expect(subject.classList.contains("foo")).toBe(true);
  });
});
