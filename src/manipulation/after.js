/* @flow */
/* eslint no-redeclare: "off" */

import type { Insertable } from "./types";

import { drop, toArray } from "../utils";

function afterNode(element: Element, parentNode: Node, insertable: Node): void {
  parentNode.insertBefore(insertable, element.nextSibling);
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

  drop(arguments, 1).reverse().forEach(insertable => {
    if (typeof insertable === "string") {
      element.insertAdjacentHTML("afterend", insertable);
    } else if (insertable instanceof Node) {
      afterNode(element, parentNode, insertable);
    } else {
      toArray(insertable).reverse().forEach(node => {
        afterNode(element, parentNode, node);
      });
    }
  });
}

export default after;
