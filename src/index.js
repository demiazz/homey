/* @flow */

/*
 * Types
 */

type CSSClass = string;

type Elements = Array<Element>;

type Selector = string;

/*
 * Utilities
 */

function toArray(arrayLike: any): Array<any> {
  return Array.prototype.slice.call(arrayLike);
}

/*
 * Queries
 */

function query(selector: Selector, element: Element): ?Element {
  return (element || document).querySelector(selector);
}

function queryAll(selector: Selector, element: Element): Elements {
  const elements = (element || document).querySelectorAll(selector);

  return (toArray(elements): Elements);
}

type MatchesFn = (selector: Selector) => boolean;
type MatchesAPI = { matches: MatchesFn } & { matchesSelector: MatchesFn } & {
    msMatchesSelector: MatchesFn
  } & { mozMatchesSelector: MatchesFn } & {
    webkitMatchesSelector: MatchesFn
  } & { oMatchesSelector: MatchesFn };

function getMatchesFn(): MatchesFn {
  const e = ((document.createElement("div"): any): MatchesAPI);

  return (
    e.matches ||
    e.matchesSelector ||
    e.msMatchesSelector ||
    e.mozMatchesSelector ||
    e.webkitMatchesSelector ||
    e.oMatchesSelector
  );
}

const matchesFn: MatchesFn = getMatchesFn();

function matches(selector: Selector, element: Element): boolean {
  return matchesFn.call(element, selector);
}

/*
 * Classes
 */

function hasClass(cssClass: CSSClass, element: Element): boolean {
  return element.classList.contains(cssClass);
}

function addClass(cssClass: CSSClass, element: Element): boolean {
  const result = !hasClass(cssClass, element);

  if (result) {
    element.classList.add(cssClass);
  }

  return result;
}

function removeClass(cssClass: CSSClass, element: Element): boolean {
  const result = hasClass(cssClass, element);

  if (result) {
    element.classList.remove(cssClass);
  }

  return result;
}

function toggleClass(cssClass: CSSClass, element: Element): boolean {
  const result = !hasClass(cssClass, element);

  if (result) {
    addClass(cssClass, element);
  } else {
    removeClass(cssClass, element);
  }

  return result;
}

/* 
 * Dataset
 */

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

function getDatasetFn() {
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

function parentBySelector(selector: Selector, element: Element): ?Element {
  const predicate = matches.bind(null, selector);

  return parentByPredicate(predicate, element);
}

function parentBy(condition: PredicateFn, element: Element): ?Element {
  return typeof condition === "string"
    ? parentBySelector(condition, element)
    : parentByPredicate(condition, element);
}

function parents(element: Element): Elements {
  const result = [];

  let current = element.parentElement;

  while (current) {
    result.push(current);

    current = current.parentElement;
  }

  return result;
}

function parentsByPredicate(
  predicate: PredicateFn,
  element: Element
): Elements {
  return parents(element).filter(predicate);
}

function parentsBySelector(selector: Selector, element: Element): Elements {
  const predicate = matches.bind(null, selector);

  return parentsByPredicate(predicate, element);
}

function parentsBy(
  condition: Selector | PredicateFn,
  element: Element
): Elements {
  return typeof condition === "string"
    ? parentsBySelector(condition, element)
    : parentsByPredicate(condition, element);
}

/*
 * Manipulate
 */

function remove(element: Element): boolean {
  const parentElement = element.parentElement;

  if (parentElement) {
    parentElement.removeChild(element);

    return true;
  }

  return false;
}

/*
 * Exports
 */

export {
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
  /* manipulate */
  remove
};
