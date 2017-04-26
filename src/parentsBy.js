/* @flow */

import matches from "./matches";
import parent from "./parent";

type PredicateFn = (element: Element) => boolean;

function parentsByPredicate(
  predicate: PredicateFn,
  element: Element
): Array<Element> {
  const result = [];

  let current = parent(element);

  while (current) {
    if (predicate(current)) {
      result.push(current);
    }

    current = parent(current);
  }

  return result;
}

function parentsBySelector(selector: string, element: Element): Array<Element> {
  const predicate = matches.bind(null, selector);

  return parentsByPredicate(predicate, element);
}

function parentsBy(
  condition: string | PredicateFn,
  element: Element
): Array<Element> {
  return typeof condition === "string"
    ? parentsBySelector(condition, element)
    : parentsByPredicate(condition, element);
}

export default parentsBy;
