import { removeClass } from "../src";

describe("removeClass", () => {
  afterEach(clearFixtures);

  it("remove given class from element if element has given class already", () => {
    useFixture(`<div class="root foo"></div>`);

    const subject = document.querySelector(".root");

    expect(subject.classList.contains("foo")).toBe(true);
    expect(removeClass("foo", subject)).toBe(true);
    expect(subject.classList.contains("foo")).toBe(false);
  });

  it("do nothing if element hasn't given class already", () => {
    useFixture(`<div class="root"></div>`);

    const subject = document.querySelector(".root");

    expect(subject.classList.contains("foo")).toBe(false);
    expect(removeClass("foo", subject)).toBe(false);
    expect(subject.classList.contains("foo")).toBe(false);
  });
});
