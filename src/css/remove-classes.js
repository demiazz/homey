/* @flow */
/* eslint no-redeclare: "off" */

import type { CSSClass } from "./types";

import removeClass from "./remove-class";

declare function removeClasses(
  element: Element,
  ...cssClasses: Array<CSSClass>
): boolean;

function removeClasses(element) {
  const cssClasses = Array.prototype.slice.call(arguments, 1);

  return cssClasses.reduce(
    (result, cssClass) => removeClass(element, cssClass) || result,
    false
  );
}

export default removeClasses;
