/* @flow */
/* eslint no-redeclare: "off" */

import type { CSSClass } from "./types";

import addClass from "./add-class";

declare function addClasses(
  element: Element,
  ...cssClasses: Array<CSSClass>
): boolean;

function addClasses(element): boolean {
  const cssClasses = Array.prototype.slice.call(arguments, 1);

  return cssClasses.reduce(
    (result, cssClass) => addClass(element, cssClass) || result,
    false
  );
}

export default addClasses;
