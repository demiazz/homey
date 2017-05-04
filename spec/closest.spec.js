import { closest } from "../src";

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
});
