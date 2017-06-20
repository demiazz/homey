import parents from "../../src/fn/parents";

describe("fn/parents", () => {
  it("returns all parents", () => {
    useFixture(`
      <div class="parent">
        <div class="root"></div>
      </div>
    `);

    const subject = document.querySelector(".root");

    expect(parents(subject)).toEqual([
      document.querySelector(".parent"),
      document.body,
      document.documentElement
    ]);
  });

  it("returns empty array if element is detached", () => {
    const element = document.createElement("div");

    expect(parents(element)).toEqual([]);
  });
});
