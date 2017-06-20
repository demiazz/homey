import toggleClasses from "../../src/fn/toggle-classes";

describe("fn/toggle-classes", () => {
  afterEach(clearFixtures);

  describe("given a string", () => {
    it("adds given class if element hasn't a given class already", () => {
      useFixture(`<div class="root"></div>`);

      const subject = document.querySelector(".root");

      expect(subject.classList.contains("foo")).toBe(false);

      toggleClasses(subject, "foo");

      expect(subject.classList.contains("foo")).toBe(true);
    });

    it("removes given class if element has a given class already", () => {
      useFixture(`<div class="root foo"></div>`);

      const subject = document.querySelector(".root");

      expect(subject.classList.contains("foo")).toBe(true);

      toggleClasses(subject, "foo");

      expect(subject.classList.contains("foo")).toBe(false);
    });
  });

  describe("given strings", () => {
    it("toggles given classes", () => {
      useFixture(`<div class="root foo"></div>`);

      const subject = document.querySelector(".root");

      expect(subject.classList.contains("foo")).toBe(true);
      expect(subject.classList.contains("bar")).toBe(false);

      toggleClasses(subject, "foo", "bar");

      expect(subject.classList.contains("foo")).toBe(false);
      expect(subject.classList.contains("bar")).toBe(true);
    });
  });

  describe("class given as an object", () => {
    it("uses key as class and value as state and toggle class", () => {
      [
        ["", { foo: true }, false, true],
        ["", { foo: false }, false, false],
        ["foo", { foo: true }, true, true],
        ["foo", { foo: false }, true, false]
      ].forEach(([classes, toggle, before, after]) => {
        useFixture(`<div class="root ${classes}"></div>`);

        const subject = document.querySelector(".root");

        expect(subject.classList.contains("foo")).toBe(before);

        toggleClasses(subject, toggle);

        expect(subject.classList.contains("foo")).toBe(after);

        clearFixtures();
      });
    });

    it("supports multiple classes in one object", () => {
      useFixture(`
        <div class="root permanent removed"></div>
      `);

      const subject = document.querySelector(".root");

      expect(subject.classList.contains("permanent")).toBe(true);
      expect(subject.classList.contains("removed")).toBe(true);
      expect(subject.classList.contains("unexisting")).toBe(false);
      expect(subject.classList.contains("added")).toBe(false);

      toggleClasses(subject, {
        permanent: true,
        removed: false,
        unexisting: false,
        added: true
      });

      expect(subject.classList.contains("permanent")).toBe(true);
      expect(subject.classList.contains("removed")).toBe(false);
      expect(subject.classList.contains("unexisting")).toBe(false);
      expect(subject.classList.contains("added")).toBe(true);
    });
  });

  describe("given strings and objects", () => {
    it("toggles classes given as string or object", () => {
      useFixture(`<div class="root string-removed object-removed"></div>`);

      const subject = document.querySelector(".root");

      expect(subject.classList.contains("string-added")).toBe(false);
      expect(subject.classList.contains("string-removed")).toBe(true);
      expect(subject.classList.contains("object-added")).toBe(false);
      expect(subject.classList.contains("object-removed")).toBe(true);

      toggleClasses(subject, "string-added", "string-removed", {
        "object-added": true,
        "object-removed": false
      });

      expect(subject.classList.contains("string-added")).toBe(true);
      expect(subject.classList.contains("string-removed")).toBe(false);
      expect(subject.classList.contains("object-added")).toBe(true);
      expect(subject.classList.contains("object-removed")).toBe(false);
    });
  });

  it("returns `true` if toggles all of given classes", () => {
    useFixture(`<div class="root foo"></div>`);

    const subject = document.querySelector(".root");

    expect(subject.classList.contains("foo")).toBe(true);
    expect(subject.classList.contains("bar")).toBe(false);

    expect(toggleClasses(subject, "foo", "bar")).toBe(true);

    expect(subject.classList.contains("foo")).toBe(false);
    expect(subject.classList.contains("bar")).toBe(true);
  });

  it("returns `true` if toggles at least one of given classes", () => {
    useFixture(`<div class="root foo"></div>`);

    const subject = document.querySelector(".root");

    expect(subject.classList.contains("foo")).toBe(true);
    expect(subject.classList.contains("bar")).toBe(false);

    expect(toggleClasses(subject, "foo", { bar: false })).toBe(true);

    expect(subject.classList.contains("foo")).toBe(false);
    expect(subject.classList.contains("bar")).toBe(false);
  });

  it("returns `false` if toggles no one of given classes", () => {
    useFixture(`<div class="root"></div>`);

    const subject = document.querySelector(".root");

    expect(subject.classList.contains("foo")).toBe(false);
    expect(subject.classList.contains("bar")).toBe(false);

    expect(toggleClasses(subject, { foo: false, bar: false })).toBe(false);

    expect(subject.classList.contains("foo")).toBe(false);
    expect(subject.classList.contains("bar")).toBe(false);
  });
});
