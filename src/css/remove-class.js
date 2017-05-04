/* @flow */

import type { CSSClass } from "../types";

import hasClass from "./has-class";

function removeClass(element: Element, cssClass: CSSClass): boolean {
  const result = hasClass(element, cssClass);

  if (result) {
    element.classList.remove(cssClass);
  }

  return result;
}

export default removeClass;
