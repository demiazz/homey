/* @flow */

import matches from "./matches";
import parent from "./parent";
import parentBy from "./parentBy";
import parents from "./parents";
import parentsBy from "./parentsBy";
import remove from "./remove";

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

/* ----- hasClass ----- */

function hasClass(cssClass: string, element: Element): boolean {
  return element.classList.contains(cssClass);
}

/* ----- addClass ----- */

function addClass(cssClass: string, element: Element): boolean {
  const result = !hasClass(cssClass, element);

  if (result) {
    element.classList.add(cssClass);
  }

  return result;
}

/* ----- removeClass ----- */

function removeClass(cssClass: string, element: Element): boolean {
  const result = hasClass(cssClass, element);

  if (result) {
    element.classList.remove(cssClass);
  }

  return result;
}

/* ----- toggleClass ----- */

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

/* ----- dataset ----- */

function dataset(element: HTMLElement): Dataset {
  return datasetFn(element);
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
  /* dataset */
  dataset,
  /* other */
  matches,
  parent,
  parentBy,
  parents,
  parentsBy,
  remove
};
