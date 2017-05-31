import { getHtml } from "../../src";

describe("getHtml", () => {
  afterEach(clearFixtures);

  it("returns inner html of element in string representation", () => {
    useFixture(`
      <div class="root">
        Parent Text
        <div>
          Children Text
        </div>
      </div>
    `);

    const subject = document.querySelector(".root");

    expect(getHtml(subject)).toEqual(subject.innerHTML);
  });
});
