import { getAttr } from "../../src";

describe("getAttr", () => {
  afterEach(clearFixtures);

  it("returns attributes value if exists", () => {
    useFixture(`<div class="root"></div>`);

    const subject = document.querySelector(".root");

    expect(getAttr(subject, "class")).toBe("root");
  });

  it("returns `null` if element hasn't attribute with given name", () => {
    useFixture(`<div class="root"></div>`);

    const subject = document.querySelector(".root");

    expect(getAttr(subject, "id")).toBeNull();
  });
});
