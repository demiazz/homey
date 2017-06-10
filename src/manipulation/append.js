/* @flow */

import type { Insertable } from "./types";

import { toArray } from "../utils";

function appendString(element: Element, insertable: string): void {
  element.insertAdjacentHTML("beforeend", insertable);
}

function appendNode(element: Element, insertable: Node): void {
  element.appendChild(insertable);
}

function appendNodeList(element: Element, insertable: NodeList<*>): void {
  toArray(insertable).forEach(node => {
    appendNode(element, node);
  });
}

export default function append(
  element: Element,
  ...insertables: Array<Insertable>
): void {
  insertables.forEach(insertable => {
    if (typeof insertable === "string") {
      appendString(element, insertable);
    } else if (insertable instanceof Node) {
      appendNode(element, insertable);
    } else {
      appendNodeList(element, insertable);
    }
  });
}
