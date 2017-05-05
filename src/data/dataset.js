/* @flow */

import type { Dataset } from "./types";

function native(element: HTMLElement): Dataset {
  return element.dataset;
}

function polyfill(element: HTMLElement): Dataset {
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

  return element.dataset ? native : polyfill;
}

const datasetFn = getDatasetFn();

function dataset(element: HTMLElement): Dataset {
  return datasetFn(element);
}

export default dataset;
