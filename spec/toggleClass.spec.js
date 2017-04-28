import { toggleClass } from "../src";

describe("toggleClass", () => {
  afterEach(clearFixtures);

  it("adds given class if element has a given class already", () => {
    useFixture(`<div class="root"></div>`);

    const subject = document.querySelector(".root");

    expect(subject.classList.contains("foo")).toBe(false);
    expect(toggleClass(subject, "foo")).toBe(true);
    expect(subject.classList.contains("foo")).toBe(true);
  });

  it("removes given class if element has a given class already", () => {
    useFixture(`<div class="root foo"></div>`);

    const subject = document.querySelector(".root");

    expect(subject.classList.contains("foo")).toBe(true);
    expect(toggleClass(subject, "foo")).toBe(true);
    expect(subject.classList.contains("foo")).toBe(false);
  });

  describe("when state is given", () => {
    describe("and state equals to `true`", () => {
      const state = true;

      it("adds given class", () => {
        useFixture(`<div class="root"></div>`);

        const subject = document.querySelector(".root");

        expect(subject.classList.contains("foo")).toBe(false);
        expect(toggleClass(subject, "foo", state)).toBe(true);
        expect(subject.classList.contains("foo")).toBe(true);
      });

      it("do nothing if element has a given class already", () => {
        useFixture(`<div class="root foo"></div>`);

        const subject = document.querySelector(".root");

        expect(subject.classList.contains("foo")).toBe(true);
        expect(toggleClass(subject, "foo", state)).toBe(false);
        expect(subject.classList.contains("foo")).toBe(true);
      });
    });

    describe("and state equals to `false`", () => {
      const state = false;

      it("removes given class", () => {
        useFixture(`<div class="root foo"></div>`);

        const subject = document.querySelector(".root");

        expect(subject.classList.contains("foo")).toBe(true);
        expect(toggleClass(subject, "foo", state)).toBe(true);
        expect(subject.classList.contains("foo")).toBe(false);
      });

      it("do nothing if element hasn't a given class already", () => {
        useFixture(`<div class="root"></div>`);

        const subject = document.querySelector(".root");

        expect(subject.classList.contains("foo")).toBe(false);
        expect(toggleClass(subject, "foo", state)).toBe(false);
        expect(subject.classList.contains("foo")).toBe(false);
      });
    });
  });
});
