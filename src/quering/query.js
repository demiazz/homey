/* @flow */

import type { CSSSelector } from "../types";

function query(element: Element, selector: CSSSelector): ?Element {
  return element.querySelector(selector);
}

export default query;
