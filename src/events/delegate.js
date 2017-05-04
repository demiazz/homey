/* @flow */

import type { EventListener, EventType, Selector } from "../types";

import matches from "../traversing/matches";
import parent from "../traversing/parent";

function delegate(
  element: Element,
  selector: Selector,
  eventType: EventType,
  listener: EventListener
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

  element.addEventListener(eventType, wrappedListener);

  return () => element.removeEventListener(eventType, wrappedListener);
}

export default delegate;
