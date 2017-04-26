/* @flow */

function queryAll(selector: string, element: Element): Array<Element> {
  return [].slice.call(element.querySelectorAll(selector));
}

export default queryAll;
