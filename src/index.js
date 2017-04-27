/* @flow */

import matches from "./matches";
import parent from "./parent";
import parentBy from "./parentBy";
import parents from "./parents";
import parentsBy from "./parentsBy";
import remove from "./remove";
import dataset from "./dataset";

/*
 *
 */

function toArray(arrayLike: any): Array<any> {
  return Array.prototype.slice.call(arrayLike);
}

/*
 * Queries
 */

/* ----- query ----- */

function query(selector: string, element: Element): ?Element {
  return (element || document).querySelector(selector);
}

/* ----- queryAll ----- */

function queryAll(selector: string, element: Element): Array<Element> {
  const elements = (element || document).querySelectorAll(selector);

  return (toArray(elements): Array<Element>);
}

/*
 * Classes
 */

function hasClass(cssClass: string, element: Element): boolean {
  return element.classList.contains(cssClass);
}

function addClass(cssClass: string, element: Element): boolean {
  const result = !hasClass(cssClass, element);

  if (result) {
    element.classList.add(cssClass);
  }

  return result;
}

function removeClass(cssClass: string, element: Element): boolean {
  const result = hasClass(cssClass, element);

  if (result) {
    element.classList.remove(cssClass);
  }

  return result;
}

function toggleClass(cssClass: string, element: Element): boolean {
  const result = !hasClass(cssClass, element);

  if (result) {
    addClass(cssClass, element);
  } else {
    removeClass(cssClass, element);
  }

  return result;
}

/*
 * Exports
 */

export {
  /* queries */
  query,
  queryAll,
  /* classes */
  hasClass,
  addClass,
  removeClass,
  toggleClass,
  /* other */
  matches,
  parent,
  parentBy,
  parents,
  parentsBy,
  remove,
  dataset
};
