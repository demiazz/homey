/* @flow */

import matches from "./matches";

type PredicateFn = (element: Element) => boolean;

function parentByPredicate(predicate: PredicateFn, element: Element): ?Element {
  let parent = element.parentElement;

  while (parent) {
    if (predicate(parent)) {
      return parent;
    }

    parent = parent.parentElement;
  }

  return null;
}

function parentBySelector(selector: string, element: Element): ?Element {
  return parentByPredicate(e => matches(selector, e), element);
}

function parentBy(condition: PredicateFn, element: Element): ?Element {
  return typeof condition === "string"
    ? parentBySelector(condition, element)
    : parentByPredicate(condition, element);
}

export default parentBy;
