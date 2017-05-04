/* @flow */

import type { EventDetails, EventOptions, EventType } from "../types";

import { getProperty } from "../utils";

function dispatch(
  element: Element,
  eventType: EventType,
  details?: EventDetails = {},
  options?: EventOptions = {}
): boolean {
  const event = (document.createEvent("HTMLEvents"): any);
  const bubbles = getProperty(options, "bubbles", true);
  const cancelable = getProperty(options, "cancelable", true);

  event.initEvent(eventType, bubbles, cancelable);
  (event: any).details = details;

  return element.dispatchEvent(event);
}

export default dispatch;
