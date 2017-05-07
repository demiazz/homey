/* @flow */

import type { CSSClass, CSSClassesMap } from "./types";

import toggleClass from "./toggle-class";

function toggleClassesByMap(
  element: Element,
  cssClasses: CSSClassesMap
): boolean {
  return Object.keys(cssClasses).reduce((result, cssClass) => {
    const state = cssClasses[cssClass];

    return toggleClass(element, cssClass, state) || result;
  }, false);
}

function toggleClasses(
  element: Element,
  ...cssClasses: Array<CSSClass | CSSClassesMap>
): boolean {
  return cssClasses.reduce((result, cssClass) => {
    const currentResult = typeof cssClass === "string"
      ? toggleClass(element, cssClass)
      : toggleClassesByMap(element, cssClass);

    return currentResult || result;
  }, false);
}

export default toggleClasses;
