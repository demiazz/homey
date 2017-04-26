/* @flow */

import matches from "./matches";

function parentsBy(selector: string, element: Element): Array<Element> {
  const result = [];

  let parent = element.parentElement;

  while (parent) {
    if (matches(selector, parent)) {
      result.push(parent);
    }

    parent = parent.parentElement;
  }

  return result;
}

export default parentsBy;
