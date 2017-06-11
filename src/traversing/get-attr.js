/* @flow */

function getAttr(element: Element, attribute: string): ?string {
  if (element.hasAttribute(attribute)) {
    return element.getAttribute(attribute);
  }

  return null;
}

export default getAttr;
