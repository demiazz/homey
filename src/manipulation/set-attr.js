/* @flow */

function setAttr(element: Element, attribute: string, value: any): void {
  if (value === null) {
    element.removeAttribute(attribute);
  } else {
    element.setAttribute(attribute, value);
  }
}

export default setAttr;
