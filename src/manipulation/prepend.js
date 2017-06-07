/* @flow */

import type { Insertable } from "./types";

import { toArray } from "../utils";

function prependString(element: Element, insertable: string): void {
  element.insertAdjacentHTML("afterbegin", insertable);
}

function prependNode(element: Element, insertable: Node): void {
  element.insertBefore(insertable, element.firstChild);
}

function prependNodeList(element: Element, insertable: NodeList<*>): void {
  toArray(insertable).reverse().forEach(node => {
    prependNode(element, node);
  });
}

export default function prepend(
  element: Element,
  ...insertables: Array<Insertable>
): void {
  insertables.reverse().forEach(insertable => {
    if (typeof insertable === "string") {
      prependString(element, insertable);
    } else if (insertable instanceof Node) {
      prependNode(element, insertable);
    } else {
      prependNodeList(element, insertable);
    }
  });

  element.normalize();
}
