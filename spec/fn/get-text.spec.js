import { getText } from "../../src";

describe("getText", () => {
  afterEach(clearFixtures);

  it("returns inner text of element", () => {
    useFixture(`
      <div class="root">
        Parent Text
        <div>
          Children Text
        </div>
      </div>
    `);

    const subject = document.querySelector(".root");

    expect(getText(subject)).toEqual(subject.textContent);
  });
});
