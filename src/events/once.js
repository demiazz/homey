/* @flow */

import type { EventListener, EventType } from "../types";

function once(
  element: Element,
  eventType: EventType,
  listener: EventListener
): () => void {
  function wrappedListener(event) {
    element.removeEventListener(eventType, wrappedListener);

    listener(event);
  }

  element.addEventListener(eventType, wrappedListener);

  return () => element.removeEventListener(eventType, wrappedListener);
}

export default once;
