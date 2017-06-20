/* @flow */
/* eslint no-redeclare: "off" */

import type { Insertable } from "../types";

import { drop, toArray } from "../utils";

function appendNode(element: Element, insertable: Node): void {
  element.appendChild(insertable);
}

declare function append(
  element: Element,
  ...insertables: Array<Insertable>
): void;

function append(element) {
  drop(arguments, 1).forEach(insertable => {
    if (typeof insertable === "string") {
      element.insertAdjacentHTML("beforeend", insertable);
    } else if (insertable instanceof Node) {
      appendNode(element, insertable);
    } else {
      toArray(insertable).forEach(node => {
        appendNode(element, node);
      });
    }
  });
}

export default append;
