/* @flow */

import type { Predicate, Selector } from "../types";

import matches from "../traversing/matches";
import parentBy from "../traversing/parent-by";

type Closest = (element: Element, selector: Selector) => ?Element;

function polyfill(element: Element, selector: Selector): ?Element {
  if (matches(element, selector)) {
    return element;
  }

  return parentBy(element, selector);
}

function native(element: Element, selector: Selector): ?Element {
  return element.closest(selector);
}

function getClosestFn(): Closest {
  const element = document.createElement("div");

  return element.closest ? native : polyfill;
}

const closestFn: Closest = getClosestFn();

function closest(element: Element, condition: Selector | Predicate): ?Element {
  if (typeof condition === "string") {
    return closestFn(element, condition);
  }

  if (condition(element)) {
    return element;
  }

  return parentBy(element, condition);
}

export default closest;
