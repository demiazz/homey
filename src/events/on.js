/* @flow */

import type { EventType } from "../types";

function on(
  element: Element,
  eventType: EventType,
  listener: EventListener
): () => void {
  element.addEventListener(eventType, listener);

  return () => element.removeEventListener(eventType, listener);
}

export default on;
