/* @flow */

import type { CSSClass } from "./types";

import removeClass from "./remove-class";

function removeClasses(
  element: Element,
  ...cssClasses: Array<CSSClass>
): boolean {
  return cssClasses.reduce(
    (result, cssClass) => removeClass(element, cssClass) || result,
    false
  );
}

export default removeClasses;
