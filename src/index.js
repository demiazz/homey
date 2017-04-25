/* @flow */

function toArray(nodeList: NodeList<*>): Array<*> {
  return Array.prototype.slice.call(nodeList);
}

export function query(selector: string, element: Element): ?Element {
  return element.querySelector(selector);
}

export const q = query;

export function queryAll(selector: string, element: Element): Array<Element> {
  return toArray(element.querySelectorAll(selector));
}

export const qa = queryAll;
