import { queryAll, qa } from "../src";

describe("queryAll", () => {
  const root = "root";
  const matched = "child";
  const notMatched = "other";

  afterEach(clearFixtures);

  it("returns array of childs which matched by selector", () => {
    useFixture(
      `
      <div class="${root}" >
        <div class="${matched}"></div>
        <div class="${matched}"></div>
        <div class="${notMatched}"></div>
      </div>
      <div class="${matched}"></div>
      <div class="${matched}"></div>
    `
    );

    const subject = document.querySelector(`.${root}`);

    expect(queryAll(subject, `.${matched}`)).toEqual(
      [].slice.call(document.querySelectorAll(`.${root} .${matched}`))
    );
  });

  it("returns empty array when children which matched by selector not existed", () => {
    useFixture(
      `
      <div class="${root}" >
        <div class="${notMatched}"></div>
      </div>
      <div class="${matched}"></div>
      <div class="${matched}"></div>
    `
    );

    const subject = document.querySelector(`.${root}`);

    expect(queryAll(subject, `.${matched}`)).toEqual([]);
  });

  it("has a `qa` shortcut", () => {
    expect(queryAll).toBe(qa);
  });
});
