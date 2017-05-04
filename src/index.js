/* @flow */

import type { Elements, Selector } from "./types";

import { html, body } from "./aliases";
import query from "./queries/query";
import queryAll from "./queries/query-all";
import matches from "./traversing/matches";
import parent from "./traversing/parent";
import parentBy from "./traversing/parent-by";
import parents from "./traversing/parents";

/* Types */

type CSSClass = string;

type EventDetails = { [key: string]: mixed };

type EventListener = (event: Event) => mixed;

type EventType = string;

type PredicateFn = (element: Element) => boolean;

/* Classes */

function hasClass(element: Element, cssClass: CSSClass): boolean {
  return element.classList.contains(cssClass);
}

function addClass(element: Element, cssClass: CSSClass): boolean {
  const result = !hasClass(element, cssClass);

  if (result) {
    element.classList.add(cssClass);
  }

  return result;
}

function removeClass(element: Element, cssClass: CSSClass): boolean {
  const result = hasClass(element, cssClass);

  if (result) {
    element.classList.remove(cssClass);
  }

  return result;
}

function toggleClass(
  element: Element,
  cssClass: CSSClass,
  state?: boolean
): boolean {
  const target = arguments.length === 3 ? state : !hasClass(element, cssClass);
  const toggleFn = target ? addClass : removeClass;

  return toggleFn(element, cssClass);
}

/* Dataset */

type Dataset = { [key: string]: string };

type DatasetFn = (element: HTMLElement) => Dataset;

function nativeDataset(element: HTMLElement): Dataset {
  return element.dataset;
}

function polyfillDataset(element: HTMLElement): Dataset {
  return [].slice.call(element.attributes).reduce((data, { name, value }) => {
    if (/^data-(.+)/.test(name)) {
      const normalizedName = name
        .substr(5)
        .replace(/-\w/g, str => str[1].toUpperCase());

      data[normalizedName] = value;
    }

    return data;
  }, {});
}

function getDatasetFn(): DatasetFn {
  const element = document.createElement("div");

  return element.dataset ? nativeDataset : polyfillDataset;
}

const datasetFn: DatasetFn = getDatasetFn();

function dataset(element: HTMLElement): Dataset {
  return datasetFn(element);
}

/*
 * Traverse
 */

function parentsBy(
  element: Element,
  condition: Selector | PredicateFn
): Elements {
  const predicate = typeof condition === "string"
    ? e => matches(e, condition)
    : condition;

  return parents(element).filter(predicate);
}

type ClosestFn = (element: Element, selector: Selector) => ?Element;

function polyfillClosest(element: Element, selector: Selector): ?Element {
  if (matches(element, selector)) {
    return element;
  }

  return parentBy(element, selector);
}

function nativeClosest(element: Element, selector: Selector): ?Element {
  return element.closest(selector);
}

function getClosestFn(): ClosestFn {
  const element = document.createElement("div");

  return element.closest ? nativeClosest : polyfillClosest;
}

const closestFn: ClosestFn = getClosestFn();

function closest(
  element: Element,
  condition: Selector | PredicateFn
): ?Element {
  if (typeof condition === "string") {
    return closestFn(element, condition);
  }

  if (condition(element)) {
    return element;
  }

  return parentBy(element, condition);
}

/* Manipulate */

function remove(element: Element): boolean {
  const parentElement = parent(element);

  if (parentElement) {
    parentElement.removeChild(element);

    return true;
  }

  return false;
}

/* Events */

function on(
  element: Element,
  eventType: EventType,
  listener: EventListener
): () => void {
  element.addEventListener(eventType, listener);

  return () => element.removeEventListener(eventType, listener);
}

function once(
  element: Element,
  eventType: EventType,
  listener: EventListener
): () => void {
  function wrappedListener(event) {
    element.removeEventListener(eventType, wrappedListener);

    listener(event);
  }

  element.addEventListener(eventType, wrappedListener);

  return () => element.removeEventListener(eventType, wrappedListener);
}

function delegate(
  element: Element,
  selector: Selector,
  eventType: EventType,
  listener: EventListener
): () => void {
  function wrappedListener(event) {
    if (!(event.target instanceof Element)) {
      return;
    }

    let current = event.target;

    while (current) {
      if (matches(current, selector)) {
        listener(event);

        return;
      }

      if (current === element) {
        return;
      }

      current = parent(current);
    }
  }

  element.addEventListener(eventType, wrappedListener);

  return () => element.removeEventListener(eventType, wrappedListener);
}

function dispatch(
  element: Element,
  eventType: EventType,
  details: EventDetails = {}
): boolean {
  const event = (document.createEvent("HTMLEvents"): any);

  event.initEvent(eventType, true, true);
  (event: any).details = details;

  return element.dispatchEvent(event);
}

/* Exports */

export {
  /* aliases */
  html,
  body,
  /* queries */
  query,
  queryAll,
  matches,
  /* classes */
  hasClass,
  addClass,
  removeClass,
  toggleClass,
  /* dataset */
  dataset,
  /* traverse */
  parent,
  parentBy,
  parents,
  parentsBy,
  closest,
  /* manipulate */
  remove,
  /* events */
  on,
  once,
  delegate,
  dispatch
};
