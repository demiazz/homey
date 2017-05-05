/* @flow */

import type { EventListener } from "../types";
import type { EventType } from "./types";

import on from "./on";

function once(
  element: Element,
  eventType: EventType,
  listener: EventListener,
  useCapture?: boolean = false
): () => void {
  function wrappedListener(event) {
    element.removeEventListener(eventType, wrappedListener, useCapture);

    listener(event);
  }

  return on(element, eventType, wrappedListener, useCapture);
}

export default once;
