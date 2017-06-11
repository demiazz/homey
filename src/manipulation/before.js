/* @flow */
/* eslint no-redeclare: "off" */

import type { Insertable } from "./types";

import { toArray } from "../utils";

function beforeString(element: Element, insertable: string): void {
  element.insertAdjacentHTML("beforebegin", insertable);
}

function beforeNode(
  element: Element,
  parentNode: Node,
  insertable: Node
): void {
  parentNode.insertBefore(insertable, element);
}

function beforeNodeList(
  element: Element,
  parentNode: Node,
  insertables: Node<*>
): void {
  toArray(insertables).forEach(insertable => {
    beforeNode(element, parentNode, insertable);
  });
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

  const insertables = Array.prototype.slice.call(arguments, 1);

  insertables.forEach(insertable => {
    if (typeof insertable === "string") {
      beforeString(element, insertable);
    } else if (insertable instanceof Node) {
      beforeNode(element, parentNode, insertable);
    } else {
      beforeNodeList(element, parentNode, insertable);
    }
  });
}

export default before;
