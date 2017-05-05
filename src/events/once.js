/* @flow */
/* eslint no-redeclare: "off", import/no-mutable-exports: "off" */

import type {
  CustomEventHandler,
  DelegateEventHandler,
  EventType
} from "./types";

import on from "./on";

declare function once(
  element: Element,
  eventType: MouseEventTypes,
  handler: MouseEventHandler,
  useCapture?: boolean
): mixed;

declare function once(
  element: Element,
  eventType: FocusEventTypes,
  handler: FocusEventHandler,
  useCapture?: boolean
): mixed;

declare function once(
  element: Element,
  eventType: KeyboardEventTypes,
  handler: KeyboardEventHandler,
  useCapture?: boolean
): mixed;

declare function once(
  element: Element,
  eventType: TouchEventTypes,
  handler: TouchEventHandler,
  useCapture?: boolean
): mixed;

declare function once(
  element: Element,
  eventType: WheelEventTypes,
  handler: WheelEventHandler,
  useCapture?: boolean
): mixed;

declare function once(
  element: Element,
  eventType: ProgressEventTypes,
  ler: ProgressEventHandler,
  useCapture?: boolean
): mixed;

declare function once(
  element: Element,
  eventType: DragEventTypes,
  handler: DragEventHandler,
  useCapture?: boolean
): mixed;

declare function once(
  element: Element,
  eventType: AnimationEventTypes,
  handler: AnimationEventHandler,
  useCapture?: boolean
): mixed;

declare function once(
  element: Element,
  eventType: EventType,
  handler: CustomEventHandler,
  useCapture?: boolean
): mixed;

declare function once(
  element: Element,
  eventType: EventType,
  handler: DelegateEventHandler,
  useCapture?: boolean
): mixed;

declare function once(
  element: Element,
  eventType: EventType,
  handler: EventHandler,
  useCapture?: boolean
): mixed;

function once(element, eventType, handler, useCapture = false): () => void {
  function wrappedHandler(event) {
    element.removeEventListener(eventType, wrappedHandler, useCapture);

    handler(event);
  }

  return on(element, eventType, wrappedHandler, useCapture);
}

export default once;
