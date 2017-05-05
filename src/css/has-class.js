/* @flow */

import type { CSSClass } from "./types";

function hasClass(element: Element, cssClass: CSSClass): boolean {
  return element.classList.contains(cssClass);
}

export default hasClass;
