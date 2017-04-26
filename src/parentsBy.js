/* @flow */

import matches from "./matches";

type PredicateFn = (element: Element) => boolean;

function parentsByPredicate(
  predicate: PredicateFn,
  element: Element
): Array<Element> {
  const result = [];

  let parent = element.parentElement;

  while (parent) {
    if (predicate(parent)) {
      result.push(parent);
    }

    parent = parent.parentElement;
  }

  return result;
}

function parentsBySelector(selector: string, element: Element): Array<Element> {
  return parentsByPredicate(e => matches(selector, e), element);
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
