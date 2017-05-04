/* @flow */

type CSSClass = string;

type Elements = Array<Element>;

type EventDetails = { [key: string]: mixed };

type EventListener = (event: Event) => mixed;

type EventType = string;

type PredicateFn = (element: Element) => boolean;

type Selector = string;

/* Utilities */

function toArray(arrayLike: any): Array<any> {
  return Array.prototype.slice.call(arrayLike);
}

/* Aliases */

const html: Element = window.document.documentElement;

const body: Element = window.document.body;

/* Queries */

function query(element: Element, selector: Selector): ?Element {
  return element.querySelector(selector);
}

function queryAll(element: Element, selector: Selector): Elements {
  const elements = element.querySelectorAll(selector);

  return (toArray(elements): Elements);
}

type MatchesFn = (selector: Selector) => boolean;

function getMatchesFn(): MatchesFn {
  const element = (document.createElement("div"): any);

  return (
    element.matches ||
    element.matchesSelector ||
    element.msMatchesSelector ||
    element.mozMatchesSelector ||
    element.webkitMatchesSelector ||
    element.oMatchesSelector
  );
}

const matchesFn: MatchesFn = getMatchesFn();

function matches(element: Element, selector: Selector): boolean {
  return matchesFn.call(element, selector);
}

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

function parent(element: Element): ?Element {
  return element.parentElement;
}

function parentBy(
  element: Element,
  condition: PredicateFn | Selector
): ?Element {
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

function parents(element: Element): Elements {
  const result = [];

  let current = parent(element);

  while (current) {
    result.push(current);

    current = parent(current);
  }

  return result;
}

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
  dispatch
};
