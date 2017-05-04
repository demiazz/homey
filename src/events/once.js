/* @flow */

import type { EventListener, EventType } from "../types";

import on from "./on";

function once(
  element: Element,
  eventType: EventType,
  listener: EventListener
): () => void {
  function wrappedListener(event) {
    element.removeEventListener(eventType, wrappedListener);

    listener(event);
  }

  return on(element, eventType, wrappedListener);
}

export default once;
