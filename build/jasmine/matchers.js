function toHaveSameHtml() {
  function getCompressedHtml(html) {
    return html
      .replace(/\s+</gm, "<")
      .replace(/>\s+/gm, ">")
      .replace(/\s+/gm, " ")
      .trim();
  }

  return {
    compare(actual, expected) {
      const actualHtml = getCompressedHtml(actual.innerHTML);
      const expectedHtml = getCompressedHtml(expected);

      const pass = actualHtml === expectedHtml;

      const message = pass
        ? `Expected node not to have "${expectedHtml}"`
        : `Expected node to have "${expectedHtml}" but have "${actualHtml}"`;

      return { pass, message };
    }
  };
}

jasmine.Expectation.addCoreMatchers({ toHaveSameHtml });
