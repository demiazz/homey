/* @flow */

function query(selector: string, element: Element): ?Element {
  return element.querySelector(selector);
}

export default query;
