/* @flow */

import type { CSSSelector, Predicate } from "../types";

import matches from "../traversing/matches";
import parentBy from "../traversing/parent-by";

type Closest = (element: Element, selector: CSSSelector) => ?Element;

function closestPolyfill(element: Element, selector: CSSSelector): ?Element {
  if (matches(element, selector)) {
    return element;
  }

  return parentBy(element, selector);
}

function closestNative(element: Element, selector: CSSSelector): ?Element {
  return element.closest(selector);
}

function getClosestFn(): Closest {
  const element = document.createElement("div");

  return element.closest ? closestNative : closestPolyfill;
}

const closestFn: Closest = getClosestFn();

function closest(
  element: Element,
  condition: CSSSelector | Predicate
): ?Element {
  if (typeof condition === "string") {
    return closestFn(element, condition);
  }

  if (condition(element)) {
    return element;
  }

  return parentBy(element, condition);
}

export default closest;
