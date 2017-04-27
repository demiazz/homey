import { toggleClass } from "../src";

describe("toggleClass", () => {
  afterEach(clearFixtures);

  it("removes given class if element has a given class already", () => {
    useFixture(`<div class="root foo"></div>`);

    const subject = document.querySelector(".root");

    expect(subject.classList.contains("foo")).toBe(true);
    expect(toggleClass(subject, "foo")).toBe(false);
    expect(subject.classList.contains("foo")).toBe(false);
  });

  it("adds given class if element has a given class already", () => {
    useFixture(`<div class="root"></div>`);

    const subject = document.querySelector(".root");

    expect(subject.classList.contains("foo")).toBe(false);
    expect(toggleClass(subject, "foo")).toBe(true);
    expect(subject.classList.contains("foo")).toBe(true);
  });
});
