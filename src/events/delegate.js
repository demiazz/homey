/* @flow */

import type { CSSSelector, EventListener } from "../types";
import type { EventType } from "./types";

import matches from "../traversing/matches";
import parent from "../traversing/parent";

import on from "./on";

function delegate(
  element: Element,
  selector: CSSSelector,
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
        (event: any).delegateTarget = element;

        listener(event);

        delete (event: any).delegateTarget;

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
