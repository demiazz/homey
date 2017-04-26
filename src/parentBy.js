/* @flow */

import matches from "./matches";

function parentBy(selector: string, element: Element): ?Element {
  let parent = element.parentElement;

  while (parent) {
    if (matches(selector, parent)) {
      return parent;
    }

    parent = parent.parentElement;
  }

  return null;
}

export default parentBy;
