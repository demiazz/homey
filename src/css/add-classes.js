/* @flow */

import type { CSSClass } from "./types";

import addClass from "./add-class";

function addClasses(element: Element, ...cssClasses: Array<CSSClass>) {
  return cssClasses.reduce(
    (result, cssClass) => addClass(element, cssClass) || result,
    false
  );
}

export default addClasses;
