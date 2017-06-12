/* @flow */

function getAttr(
  element: Element,
  attribute: string,
  defaultValue: ?string = null
): ?string {
  if (element.hasAttribute(attribute)) {
    return element.getAttribute(attribute);
  }

  return defaultValue;
}

export default getAttr;
