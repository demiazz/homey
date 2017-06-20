/* @flow */
/* eslint no-redeclare: "off" */

import type { Insertable } from "../types";

import { drop, toArray } from "../utils";

import parent from "./parent";

function beforeNode(
  element: Element,
  parentElement: Element,
  insertable: Node
): void {
  parentElement.insertBefore(insertable, element);
}

declare function before(
  element: Element,
  ...insertables: Array<Insertable>
): void;

function before(element) {
  const parentElement = parent(element);

  if (!parentElement) {
    throw new Error("The element has no parent");
  }

  drop(arguments, 1).forEach(insertable => {
    if (typeof insertable === "string") {
      element.insertAdjacentHTML("beforebegin", insertable);
    } else if (insertable instanceof Node) {
      beforeNode(element, parentElement, insertable);
    } else {
      toArray(insertable).forEach(node => {
        beforeNode(element, parentElement, node);
      });
    }
  });
}

export default before;
