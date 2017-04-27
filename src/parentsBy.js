/* @flow */

import matches from "./matches";
import parents from "./parents";

type PredicateFn = (element: Element) => boolean;

function parentsByPredicate(
  predicate: PredicateFn,
  element: Element
): Array<Element> {
  return parents(element).filter(predicate);
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
