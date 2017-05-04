/* @flow */

import type { EventDetails, EventType } from "../types";

function dispatch(
  element: Element,
  eventType: EventType,
  details: EventDetails = {}
): boolean {
  const event = (document.createEvent("HTMLEvents"): any);

  event.initEvent(eventType, true, true);
  (event: any).details = details;

  return element.dispatchEvent(event);
}

export default dispatch;
