/* @flow */

/* ----- Utilities ----- */

function toArray(nodeList: NodeList<*>): Array<*> {
  return Array.prototype.slice.call(nodeList);
}

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

/* ----- Selectors ----- */

export function query(selector: string, element: Element): ?Element {
  return element.querySelector(selector);
}

export function queryAll(selector: string, element: Element): Array<Element> {
  return toArray(element.querySelectorAll(selector));
}

export function matches(selector: string, element: Element): boolean {
  return matchesFn.call(element, selector);
}

/* ----- Traversing ----- */

export function parent(element: Element): ?Element {
  return element.parentElement;
}

export function parents(element: Element): Array<Element> {
  const result = [];

  let parentElement = element.parentElement;

  while (parentElement) {
    result.push(parentElement);

    parentElement = parentElement.parentElement;
  }

  return result;
}
