/* @flow */

import type { EventType } from "../types";

function on(
  element: Element,
  eventType: EventType,
  listener: EventListener,
  useCapture?: boolean = false
): () => void {
  element.addEventListener(eventType, listener, useCapture);

  return () => element.removeEventListener(eventType, listener, useCapture);
}

export default on;
