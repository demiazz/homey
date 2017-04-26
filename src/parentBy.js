/* @flow */

import matches from "./matches";
import parent from "./parent";

type PredicateFn = (element: Element) => boolean;

function parentByPredicate(predicate: PredicateFn, element: Element): ?Element {
  let current = parent(element);

  while (current) {
    if (predicate(current)) {
      return current;
    }

    current = parent(current);
  }

  return null;
}

function parentBySelector(selector: string, element: Element): ?Element {
  const predicate = matches.bind(null, selector);

  return parentByPredicate(predicate, element);
}

function parentBy(condition: PredicateFn, element: Element): ?Element {
  return typeof condition === "string"
    ? parentBySelector(condition, element)
    : parentByPredicate(condition, element);
}

export default parentBy;
