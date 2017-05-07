import { removeClasses } from "../../src";

describe("removeClasses", () => {
  afterEach(clearFixtures);

  it("adds classes from given list which added to element early", () => {
    useFixture(`<div class="root foo"></div>`);

    const subject = document.querySelector(".root");

    expect(subject.classList.contains("foo")).toBe(true);
    expect(subject.classList.contains("bar")).toBe(false);

    removeClasses(subject, "foo", "bar");

    expect(subject.classList.contains("foo")).toBe(false);
    expect(subject.classList.contains("bar")).toBe(false);
  });

  it("returns `true` if all given classes has been removed from element", () => {
    useFixture(`<div class="root foo bar"></div>`);

    const subject = document.querySelector(".root");

    expect(subject.classList.contains("foo")).toBe(true);
    expect(subject.classList.contains("bar")).toBe(true);

    expect(removeClasses(subject, "foo", "bar")).toBe(true);

    expect(subject.classList.contains("foo")).toBe(false);
    expect(subject.classList.contains("bar")).toBe(false);
  });

  it("returns `true` if any given class has been removed from element", () => {
    useFixture(`<div class="root foo"></div>`);

    const subject = document.querySelector(".root");

    expect(subject.classList.contains("foo")).toBe(true);
    expect(subject.classList.contains("bar")).toBe(false);

    expect(removeClasses(subject, "foo", "bar")).toBe(true);

    expect(subject.classList.contains("foo")).toBe(false);
    expect(subject.classList.contains("bar")).toBe(false);
  });

  it("returns `false` if all given class hasn't been removed from element", () => {
    useFixture(`<div class="root"></div>`);

    const subject = document.querySelector(".root");

    expect(subject.classList.contains("foo")).toBe(false);
    expect(subject.classList.contains("bar")).toBe(false);

    expect(removeClasses(subject, "foo", "bar")).toBe(false);

    expect(subject.classList.contains("foo")).toBe(false);
    expect(subject.classList.contains("bar")).toBe(false);
  });
});
