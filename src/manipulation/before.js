/* @flow */
/* eslint no-redeclare: "off" */

import type { Insertable } from "./types";

import { drop, toArray } from "../utils";

function beforeNode(
  element: Element,
  parentNode: Node,
  insertable: Node
): void {
  parentNode.insertBefore(insertable, element);
}

declare function before(
  element: Element,
  ...insertables: Array<Insertable>
): void;

function before(element) {
  const parentNode = element.parentNode;

  if (!parentNode) {
    throw new Error("The node has no parent");
  }

  drop(arguments, 1).forEach(insertable => {
    if (typeof insertable === "string") {
      element.insertAdjacentHTML("beforebegin", insertable);
    } else if (insertable instanceof Node) {
      beforeNode(element, parentNode, insertable);
    } else {
      toArray(insertable).forEach(node => {
        beforeNode(element, parentNode, node);
      });
    }
  });
}

export default before;
