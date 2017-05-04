/* @flow */

import type { Selector } from "../types";

function query(element: Element, selector: Selector): ?Element {
  return element.querySelector(selector);
}

export default query;
