function toBeTextNode() {
  return {
    compare(actual) {
      const pass = actual.nodeType === 3;
      const message = pass
        ? `Expected node to be a text node`
        : `Expected node not to be a text node`;

      return { pass, message };
    }
  };
}

function toBeElementNode() {
  return {
    compare(actual) {
      const pass = actual.nodeType === 1;
      const message = pass
        ? `Expected node to be a element node`
        : `Expected node not to be a element node`;

      return { pass, message };
    }
  };
}

function toBeTag() {
  return {
    compare(actual, expected) {
      if (actual.nodeType !== 1) {
        return { pass: false, message: "Expected element node" };
      }

      const expectedTag = expected.toLowerCase();
      const actualTag = actual.tagName.toLowerCase();
      const pass = actualTag === expectedTag;
      const message = pass
        ? `Expected to be a "${expectedTag}" but it a "${actualTag}"`
        : `Expected not to be a "${expectedTag}"`;

      return { pass, message };
    }
  };
}

function toHaveText() {
  return {
    compare(actual, expected) {
      if (actual.nodeType !== 1 && actual.nodeType !== 3) {
        return { pass: false, message: "Expected text or element node" };
      }

      const expectedText = expected.trim();
      const actualText = actual.nodeType === 1
        ? actual.textContent.trim()
        : actual.wholeText.trim();
      const pass = actualText === expected;
      const message = pass
        ? `Expected node to have "${expectedText}" but have "${actualText}"`
        : `Expected node not to have "${expectedText}"`;

      return { pass, message };
    }
  };
}

jasmine.Expectation.addCoreMatchers({
  toBeTextNode,
  toBeElementNode,
  toBeTag,
  toHaveText
});
