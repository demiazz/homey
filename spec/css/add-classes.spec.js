import { addClasses } from "../../src";

describe("addClasses", () => {
  afterEach(clearFixtures);

  it("adds classes from given list which not added to element early", () => {
    useFixture(`<div class="root foo"></div>`);

    const subject = document.querySelector(".root");

    expect(subject.classList.contains("foo")).toBe(true);
    expect(subject.classList.contains("bar")).toBe(false);

    addClasses(subject, "foo", "bar");

    expect(subject.classList.contains("foo")).toBe(true);
    expect(subject.classList.contains("bar")).toBe(true);
  });

  it("returns `true` if all given classes has been added to element", () => {
    useFixture(`<div class="root"></div>`);

    const subject = document.querySelector(".root");

    expect(subject.classList.contains("foo")).toBe(false);
    expect(subject.classList.contains("bar")).toBe(false);

    expect(addClasses(subject, "foo", "bar")).toBe(true);

    expect(subject.classList.contains("foo")).toBe(true);
    expect(subject.classList.contains("bar")).toBe(true);
  });

  it("returns `true` if any given class has been added to element", () => {
    useFixture(`<div class="root foo"></div>`);

    const subject = document.querySelector(".root");

    expect(subject.classList.contains("foo")).toBe(true);
    expect(subject.classList.contains("bar")).toBe(false);

    expect(addClasses(subject, "foo", "bar")).toBe(true);

    expect(subject.classList.contains("foo")).toBe(true);
    expect(subject.classList.contains("bar")).toBe(true);
  });

  it("returns `true` if any given class has been added to element", () => {
    useFixture(`<div class="root foo bar"></div>`);

    const subject = document.querySelector(".root");

    expect(subject.classList.contains("foo")).toBe(true);
    expect(subject.classList.contains("bar")).toBe(true);

    expect(addClasses(subject, "foo", "bar")).toBe(false);

    expect(subject.classList.contains("foo")).toBe(true);
    expect(subject.classList.contains("bar")).toBe(true);
  });
});
