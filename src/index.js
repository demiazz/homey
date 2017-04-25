/* @flow */

function toArray(nodeList: NodeList<*>): Array<*> {
  return Array.prototype.slice.call(nodeList);
}

export function query(element: Element, selector: string): ?Element {
  return element.querySelector(selector);
}

export const q = query;

export function queryAll(element: Element, selector: string): Array<Element> {
  return toArray(element.querySelectorAll(selector));
}

export const qa = queryAll;
