import dataset from "../../src/fn/dataset";

describe("fn/dataset", () => {
  afterEach(clearFixtures);

  it("returns object with data from data attributes", () => {
    useFixture(`
      <div
        class="root"
        data-brand="Google"
        data-brand--product="Search"
        data-brand--product-name="GMail"
        data-brand-name="Apple"
      ></div>
    `);

    const subject = document.querySelector(".root");
    const actual = dataset(subject);
    const expected = {
      brand: "Google",
      "brand-Product": "Search",
      "brand-ProductName": "GMail",
      brandName: "Apple"
    };

    Object.keys(expected).forEach(key => {
      const value = expected[key];

      expect(actual[key]).toBe(value);
    });
  });
});
