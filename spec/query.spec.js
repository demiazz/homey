import { query, q } from "../src";

describe("query", () => {
  const root = "root";
  const matched = "child";
  const notMatched = "other";

  afterEach(clearFixtures);

  it("returns first child which matched by selector", () => {
    useFixture(
      `
      <div class="${root}" >
        <div class="${matched}"></div>
        <div class="${notMatched}"></div>
      </div>
      <div class="${matched}"></div>
    `
    );

    const subject = document.querySelector(`.${root}`);

    expect(query(subject, `.${matched}`)).toBe(
      document.querySelector(`.${matched}`)
    );
  });

  it("returns null when child which matched by selector not exists", () => {
    useFixture(
      `
      <div class="${root}" >
        <div class="${notMatched}"></div>
      </div>
      <div class="${matched}"></div>
    `
    );

    const subject = document.querySelector(`.${root}`);

    expect(query(subject, `.${matched}`)).toBe(null);
  });

  it("has a `q` shortcut", () => {
    expect(query).toBe(q);
  });
});
