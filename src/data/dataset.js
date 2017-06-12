/* @flow */

import type { Dataset } from "./types";

function datasetNative(element: HTMLElement): Dataset {
  return element.dataset;
}

function datasetPolyfill(element: HTMLElement): Dataset {
  return [].slice.call(element.attributes).reduce((data, attribute) => {
    const name = attribute.name;

    if (/^data-(.+)/.test(name)) {
      const normalizedName = name
        .substr(5)
        .replace(/-\w/g, str => str[1].toUpperCase());

      data[normalizedName] = attribute.value;
    }

    return data;
  }, {});
}

function getDatasetFn() {
  const element = document.createElement("div");

  return element.dataset ? datasetNative : datasetPolyfill;
}

const datasetFn = getDatasetFn();

function dataset(element: HTMLElement): Dataset {
  return datasetFn(element);
}

export default dataset;
