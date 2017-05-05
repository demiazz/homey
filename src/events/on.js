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
): () => void;

declare function on(
  element: Element,
  eventType: FocusEventTypes,
  handler: FocusEventHandler,
  useCapture?: boolean
): () => void;

declare function on(
  element: Element,
  eventType: KeyboardEventTypes,
  handler: KeyboardEventHandler,
  useCapture?: boolean
): () => void;

declare function on(
  element: Element,
  eventType: TouchEventTypes,
  handler: TouchEventHandler,
  useCapture?: boolean
): () => void;

declare function on(
  element: Element,
  eventType: WheelEventTypes,
  handler: WheelEventHandler,
  useCapture?: boolean
): () => void;

declare function on(
  element: Element,
  eventType: ProgressEventTypes,
  ler: ProgressEventHandler,
  useCapture?: boolean
): () => void;

declare function on(
  element: Element,
  eventType: DragEventTypes,
  handler: DragEventHandler,
  useCapture?: boolean
): () => void;

declare function on(
  element: Element,
  eventType: AnimationEventTypes,
  handler: AnimationEventHandler,
  useCapture?: boolean
): () => void;

declare function on(
  element: Element,
  eventType: EventType,
  handler: CustomEventHandler,
  useCapture?: boolean
): () => void;

declare function on(
  element: Element,
  eventType: EventType,
  handler: DelegateEventHandler,
  useCapture?: boolean
): () => void;

declare function on(
  element: Element,
  eventType: EventType,
  handler: EventHandler,
  useCapture?: boolean
): () => void;

function on(element, eventType, handler, useCapture = false) {
  element.addEventListener(eventType, (handler: any), useCapture);

  return () =>
    element.removeEventListener(eventType, (handler: any), useCapture);
}

export default on;
