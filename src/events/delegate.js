/* @flow */

import type { EventListener, EventType, Selector } from "../types";

import matches from "../traversing/matches";
import parent from "../traversing/parent";

import on from "./on";

function delegate(
  element: Element,
  selector: Selector,
  eventType: EventType,
  listener: EventListener,
  useCapture?: boolean = false
): () => void {
  function wrappedListener(event) {
    if (!(event.target instanceof Element)) {
      return;
    }

    let current = event.target;

    while (current) {
      if (matches(current, selector)) {
        listener(event);

        return;
      }

      if (current === element) {
        return;
      }

      current = parent(current);
    }
  }

  return on(element, eventType, wrappedListener, useCapture);
}

export default delegate;
