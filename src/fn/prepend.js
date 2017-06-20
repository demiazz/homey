/* @flow */
/* eslint no-redeclare: "off" */

import type { Insertable } from "../types";

import { drop, toArray } from "../utils";

function prependNode(element: Element, insertable: Node): void {
  element.insertBefore(insertable, element.firstChild);
}

declare function prepend(
  element: Element,
  ...insertables: Array<Insertable>
): void;

function prepend(element) {
  drop(arguments, 1).reverse().forEach(insertable => {
    if (typeof insertable === "string") {
      element.insertAdjacentHTML("afterbegin", insertable);
    } else if (insertable instanceof Node) {
      prependNode(element, insertable);
    } else {
      toArray(insertable).reverse().forEach(node => {
        prependNode(element, node);
      });
    }
  });
}

export default prepend;
