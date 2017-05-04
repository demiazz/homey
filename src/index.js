/* @flow */

import { html, body } from "./aliases";
import addClass from "./css/add-class";
import hasClass from "./css/has-class";
import removeClass from "./css/remove-class";
import toggleClass from "./css/toggle-class";
import delegate from "./events/delegate";
import dispatch from "./events/dispatch";
import on from "./events/on";
import once from "./events/once";
import remove from "./manipulation/remove";
import query from "./queries/query";
import queryAll from "./queries/query-all";
import closest from "./traversing/closest";
import matches from "./traversing/matches";
import parent from "./traversing/parent";
import parentBy from "./traversing/parent-by";
import parents from "./traversing/parents";
import parentsBy from "./traversing/parents-by";

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
