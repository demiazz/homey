/* @flow */
/* eslint no-redeclare: "off" */

import type { Insertable } from "./types";

import { toArray } from "../utils";

function afterString(element: Element, insertable: string): void {
  element.insertAdjacentHTML("afterend", insertable);
}

function afterNode(element: Element, parentNode: Node, insertable: Node): void {
  parentNode.insertBefore(insertable, element.nextSibling);
}

function afterNodeList(
  element: Element,
  parentNode: Node,
  insertables: Node<*>
): void {
  toArray(insertables).reverse().forEach(insertable => {
    afterNode(element, parentNode, insertable);
  });
}

declare function after(
  element: Element,
  ...insertables: Array<Insertable>
): void;

function after(element) {
  const parentNode = element.parentNode;

  if (!parentNode) {
    throw new Error("The node has no parent");
  }

  const insertables = Array.prototype.slice.call(arguments, 1);

  insertables.reverse().forEach(insertable => {
    if (typeof insertable === "string") {
      afterString(element, insertable);
    } else if (insertable instanceof Node) {
      afterNode(element, parentNode, insertable);
    } else {
      afterNodeList(element, parentNode, insertable);
    }
  });
}

export default after;
