/* @flow */
/* eslint no-redeclare: "off" */

import type { Insertable } from "./types";

import { drop, toArray } from "../utils";

function afterNode(
  element: Element,
  parentElement: Element,
  insertable: Node
): void {
  parentElement.insertBefore(insertable, element.nextSibling);
}

declare function after(
  element: Element,
  ...insertables: Array<Insertable>
): void;

function after(element) {
  const parentElement = element.parentElement;

  if (!parentElement) {
    throw new Error("The element has no parent");
  }

  drop(arguments, 1).reverse().forEach(insertable => {
    if (typeof insertable === "string") {
      element.insertAdjacentHTML("afterend", insertable);
    } else if (insertable instanceof Node) {
      afterNode(element, parentElement, insertable);
    } else {
      toArray(insertable).reverse().forEach(node => {
        afterNode(element, parentElement, node);
      });
    }
  });
}

export default after;
