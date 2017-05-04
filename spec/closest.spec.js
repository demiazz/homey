import { closest, matches } from "../src";

describe("closest", () => {
  afterEach(clearFixtures);

  it("returns element if matches by selector", () => {
    useFixture(`
      <div class="matches">
        <div class="matches root"></div>
      <div>
    `);

    const subject = document.querySelector(".root");

    expect(closest(subject, ".matches")).toBe(subject);
  });

  it("returns first parent which matches by selector", () => {
    useFixture(`
      <div class="matches">
        <div>
          <div class="matches parent">
            <div>
              <div class="root"></div>
            </div>
          </div>
        </div>
      </div>
    `);

    const subject = document.querySelector(".root");
    const parent = document.querySelector(".parent");

    expect(closest(subject, ".matches")).toBe(parent);
  });

  it("returns null if element and parents not matches by selector", () => {
    useFixture(`
      <div>
        <div>
          <div class="root"></div>
        </div>
      </div>
    `);

    const subject = document.querySelector(".root");

    expect(closest(subject, ".matches")).toBe(null);
  });

  describe("when predicate function is given", () => {
    it("returns element if matches by predicate", () => {
      useFixture(`
        <div class="matches">
          <div class="matches root"></div>
        <div>
      `);

      const subject = document.querySelector(".root");
      const predicate = element => matches(element, ".matches");

      expect(closest(subject, predicate)).toBe(subject);
    });

    it("returns first parent which matches by predicate", () => {
      useFixture(`
        <div class="matches">
          <div>
            <div class="matches parent">
              <div>
                <div class="root"></div>
              </div>
            </div>
          </div>
        </div>
      `);

      const subject = document.querySelector(".root");
      const parent = document.querySelector(".parent");
      const predicate = element => matches(element, ".matches");

      expect(closest(subject, predicate)).toBe(parent);
    });

    it("returns null if element and parents not matches by selector", () => {
      useFixture(`
        <div>
          <div>
            <div class="root"></div>
          </div>
        </div>
      `);

      const subject = document.querySelector(".root");
      const predicate = element => matches(element, ".matches");

      expect(closest(subject, predicate)).toBe(null);
    });
  });
});
