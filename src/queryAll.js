/* @flow */

function queryAll(selector: string, element?: Element): Array<Element> {
  const root = element || document;

  return [].slice.call(root.querySelectorAll(selector));
}

export default queryAll;
