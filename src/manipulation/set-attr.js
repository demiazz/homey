/* @flow */

import removeAttr from "./remove-attr";

function setAttr(element: Element, attribute: string, value: any): void {
  if (value === null) {
    removeAttr(element, attribute);
  } else {
    element.setAttribute(attribute, value);
  }
}

export default setAttr;
