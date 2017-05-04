/* @flow */

import type { Elements, Selector } from "../types";

import { toArray } from "../utils";

function queryAll(element: Element, selector: Selector): Elements {
  const elements = element.querySelectorAll(selector);

  return (toArray(elements): Elements);
}

export default queryAll;
