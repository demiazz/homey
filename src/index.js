/* @flow */

/* ----- Utilities ----- */

function toArray(nodeList: NodeList<*>): Array<*> {
  return Array.prototype.slice.call(nodeList);
}

/* ----- Selectors ----- */

export function query(selector: string, element: Element): ?Element {
  return element.querySelector(selector);
}

export const q = query;

export function queryAll(selector: string, element: Element): Array<Element> {
  return toArray(element.querySelectorAll(selector));
}

export const qa = queryAll;

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
