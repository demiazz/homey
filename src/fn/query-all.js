/* @flow */

import type { CSSSelector, Elements } from "../types";

import { toArray } from "../utils";

function queryAll(element: Element, selector: CSSSelector): Elements {
  const elements = element.querySelectorAll(selector);

  return (toArray(elements): Elements);
}

export default queryAll;
