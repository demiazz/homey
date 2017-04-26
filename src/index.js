/* @flow */

/* ----- utilities ----- */

function nodeListToArray(nodeList: NodeList<*>): Array<*> {
  return Array.prototype.slice.call(nodeList);
}

function nodeMapToArray(map: NamedNodeMap): Array<Attr> {
  return Array.prototype.slice.call(map);
}

/* ----- query ----- */

export function query(selector: string, element: Element): ?Element {
  return element.querySelector(selector);
}

/* ----- queryAll ----- */

export function queryAll(selector: string, element: Element): Array<Element> {
  return nodeListToArray(element.querySelectorAll(selector));
}

/* ----- matches ----- */

type MatchesFn = (selector: string) => boolean;

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

export function matches(selector: string, element: Element): boolean {
  return matchesFn.call(element, selector);
}

/* ----- parent ----- */

export function parent(element: Element): ?Element {
  return element.parentElement;
}

/* ----- parents ----- */

export function parents(element: Element): Array<Element> {
  const result = [];

  let parentElement = element.parentElement;

  while (parentElement) {
    result.push(parentElement);

    parentElement = parentElement.parentElement;
  }

  return result;
}

/* ----- remove ----- */

export function remove(element: Element): boolean {
  const parentElement = element.parentElement;

  if (parentElement) {
    parentElement.removeChild(element);

    return true;
  }

  return false;
}

/* ----- dataset ----- */

type Dataset = { [key: string]: string };
type DatasetFn = (element: HTMLElement) => Dataset;

function nativeDatasetFn(element: HTMLElement): Dataset {
  return element.dataset;
}

function polyfilledDatasetFn(element: HTMLElement): Dataset {
  return nodeMapToArray(element.attributes).reduce((data, { name, value }) => {
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

  return element.dataset ? nativeDatasetFn : polyfilledDatasetFn;
}

const datasetFn: DatasetFn = getDatasetFn();

export function dataset(element: HTMLElement): Dataset {
  return datasetFn(element);
}
