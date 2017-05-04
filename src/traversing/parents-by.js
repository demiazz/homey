/* @flow */

import type { Elements, Predicate, Selector } from "../types";

import matches from "./matches";
import parents from "./parents";

function parentsBy(
  element: Element,
  condition: Selector | Predicate
): Elements {
  const predicate = typeof condition === "string"
    ? e => matches(e, condition)
    : condition;

  return parents(element).filter(predicate);
}

export default parentsBy;
