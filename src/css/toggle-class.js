/* @flow */

import type { CSSClass } from "./types";

import addClass from "./add-class";
import hasClass from "./has-class";
import removeClass from "./remove-class";

function toggleClass(
  element: Element,
  cssClass: CSSClass,
  state?: boolean
): boolean {
  const target = arguments.length === 3 ? state : !hasClass(element, cssClass);
  const toggleFn = target ? addClass : removeClass;

  return toggleFn(element, cssClass);
}

export default toggleClass;
