/* @flow */

import type { Predicate, Selector } from "../types";

import matches from "./matches";
import parent from "./parent";

function parentBy(element: Element, condition: Predicate | Selector): ?Element {
  const predicate = typeof condition === "string"
    ? e => matches(e, condition)
    : condition;

  let current = parent(element);

  while (current) {
    if (predicate(current)) {
      return current;
    }

    current = parent(current);
  }

  return null;
}

export default parentBy;
