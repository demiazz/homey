/* @flow */
/* eslint no-redeclare: "off", import/no-mutable-exports: "off" */

import type {
  CustomEventHandler,
  DelegateEventHandler,
  EventType
} from "./types";

declare function on(
  element: Element,
  eventType: MouseEventTypes,
  handler: MouseEventHandler,
  useCapture?: boolean
): mixed;

declare function on(
  element: Element,
  eventType: FocusEventTypes,
  handler: FocusEventHandler,
  useCapture?: boolean
): mixed;

declare function on(
  element: Element,
  eventType: KeyboardEventTypes,
  handler: KeyboardEventHandler,
  useCapture?: boolean
): mixed;

declare function on(
  element: Element,
  eventType: TouchEventTypes,
  handler: TouchEventHandler,
  useCapture?: boolean
): mixed;

declare function on(
  element: Element,
  eventType: WheelEventTypes,
  handler: WheelEventHandler,
  useCapture?: boolean
): mixed;

declare function on(
  element: Element,
  eventType: ProgressEventTypes,
  ler: ProgressEventHandler,
  useCapture?: boolean
): mixed;

declare function on(
  element: Element,
  eventType: DragEventTypes,
  handler: DragEventHandler,
  useCapture?: boolean
): mixed;

declare function on(
  element: Element,
  eventType: AnimationEventTypes,
  handler: AnimationEventHandler,
  useCapture?: boolean
): mixed;

declare function on(
  element: Element,
  eventType: EventType,
  handler: CustomEventHandler,
  useCapture?: boolean
): mixed;

declare function on(
  element: Element,
  eventType: EventType,
  handler: DelegateEventHandler,
  useCapture?: boolean
): mixed;

declare function on(
  element: Element,
  eventType: EventType,
  handler: EventHandler,
  useCapture?: boolean
): mixed;

function on(element, eventType, handler, useCapture = false): () => void {
  element.addEventListener(eventType, (handler: any), useCapture);

  return () =>
    element.removeEventListener(eventType, (handler: any), useCapture);
}

export default on;
