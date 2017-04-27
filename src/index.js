/* @flow */

import matches from "./matches";
import parent from "./parent";
import parentBy from "./parentBy";
import parents from "./parents";
import parentsBy from "./parentsBy";
import remove from "./remove";
import dataset from "./dataset";
import addClass from "./addClass";
import removeClass from "./removeClass";
import toggleClass from "./toggleClass";
import hasClass from "./hasClass";

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
 * Exports
 */

export {
  query,
  queryAll,
  matches,
  parent,
  parentBy,
  parents,
  parentsBy,
  remove,
  dataset,
  addClass,
  removeClass,
  toggleClass,
  hasClass
};
