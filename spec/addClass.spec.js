import { addClass } from "../src";

describe("addClass", () => {
  afterEach(clearFixtures);

  it("adds given class to element if element has't given class already", () => {
    useFixture(`<div class="root"></div>`);

    const subject = document.querySelector(".root");

    expect(subject.classList.contains("foo")).toBe(false);

    addClass("foo", subject);

    expect(subject.classList.contains("foo")).toBe(true);
  });

  it("do nothing if element has given class already", () => {
    useFixture(`<div class="root foo"></div>`);

    const subject = document.querySelector(".root");

    expect(subject.classList.contains("foo")).toBe(true);

    addClass("foo", subject);

    expect(subject.classList.contains("foo")).toBe(true);
  });
});
