/* @flow */

import type { CSSSelector, Elements, Predicate } from "../types";

import matches from "./matches";
import parents from "./parents";

function parentsBy(
  element: Element,
  condition: CSSSelector | Predicate
): Elements {
  const predicate = typeof condition === "string"
    ? e => matches(e, condition)
    : condition;

  return parents(element).filter(predicate);
}

export default parentsBy;
