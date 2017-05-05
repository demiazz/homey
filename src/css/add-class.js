/* @flow */

import type { CSSClass } from "./types";

import hasClass from "./has-class";

function addClass(element: Element, cssClass: CSSClass): boolean {
  const result = !hasClass(element, cssClass);

  if (result) {
    element.classList.add(cssClass);
  }

  return result;
}

export default addClass;
