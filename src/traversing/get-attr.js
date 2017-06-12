/* @flow */

import hasAttr from "./has-attr";

function getAttr(
  element: Element,
  attribute: string,
  defaultValue: ?string = null
): ?string {
  if (hasAttr(element, attribute)) {
    return element.getAttribute(attribute);
  }

  return defaultValue;
}

export default getAttr;
