/* @flow */

import type { EventType, Selector } from "./types";

import { html, body } from "./aliases";
import addClass from "./css/add-class";
import hasClass from "./css/has-class";
import removeClass from "./css/remove-class";
import toggleClass from "./css/toggle-class";
import delegate from "./events/delegate";
import on from "./events/on";
import once from "./events/once";
import query from "./queries/query";
import queryAll from "./queries/query-all";
import matches from "./traversing/matches";
import parent from "./traversing/parent";
import parentBy from "./traversing/parent-by";
import parents from "./traversing/parents";
import parentsBy from "./traversing/parents-by";

/* Types */

type EventDetails = { [key: string]: mixed };

type PredicateFn = (element: Element) => boolean;

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
