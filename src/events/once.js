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
): () => void;

declare function once(
  element: Element,
  eventType: FocusEventTypes,
  handler: FocusEventHandler,
  useCapture?: boolean
): () => void;

declare function once(
  element: Element,
  eventType: KeyboardEventTypes,
  handler: KeyboardEventHandler,
  useCapture?: boolean
): () => void;

declare function once(
  element: Element,
  eventType: TouchEventTypes,
  handler: TouchEventHandler,
  useCapture?: boolean
): () => void;

declare function once(
  element: Element,
  eventType: WheelEventTypes,
  handler: WheelEventHandler,
  useCapture?: boolean
): () => void;

declare function once(
  element: Element,
  eventType: ProgressEventTypes,
  ler: ProgressEventHandler,
  useCapture?: boolean
): () => void;

declare function once(
  element: Element,
  eventType: DragEventTypes,
  handler: DragEventHandler,
  useCapture?: boolean
): () => void;

declare function once(
  element: Element,
  eventType: AnimationEventTypes,
  handler: AnimationEventHandler,
  useCapture?: boolean
): () => void;

declare function once(
  element: Element,
  eventType: EventType,
  handler: CustomEventHandler,
  useCapture?: boolean
): () => void;

declare function once(
  element: Element,
  eventType: EventType,
  handler: DelegateEventHandler,
  useCapture?: boolean
): () => void;

declare function once(
  element: Element,
  eventType: EventType,
  handler: EventHandler,
  useCapture?: boolean
): () => void;

function once(element, eventType, handler, useCapture = false) {
  function wrappedHandler(event) {
    element.removeEventListener(eventType, wrappedHandler, useCapture);

    handler(event);
  }

  return on(element, eventType, wrappedHandler, useCapture);
}

export default once;
