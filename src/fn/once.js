/* @flow */
/* eslint no-redeclare: "off", import/no-mutable-exports: "off" */

import type {
  CustomEventHandler,
  DelegateEventHandler,
  EventType
} from "../types";

import on from "./on";

declare function once(
  target: EventTarget,
  eventType: MouseEventTypes,
  handler: MouseEventHandler,
  useCapture?: boolean
): () => void;

declare function once(
  target: EventTarget,
  eventType: FocusEventTypes,
  handler: FocusEventHandler,
  useCapture?: boolean
): () => void;

declare function once(
  target: EventTarget,
  eventType: KeyboardEventTypes,
  handler: KeyboardEventHandler,
  useCapture?: boolean
): () => void;

declare function once(
  target: EventTarget,
  eventType: TouchEventTypes,
  handler: TouchEventHandler,
  useCapture?: boolean
): () => void;

declare function once(
  target: EventTarget,
  eventType: WheelEventTypes,
  handler: WheelEventHandler,
  useCapture?: boolean
): () => void;

declare function once(
  target: EventTarget,
  eventType: ProgressEventTypes,
  ler: ProgressEventHandler,
  useCapture?: boolean
): () => void;

declare function once(
  target: EventTarget,
  eventType: DragEventTypes,
  handler: DragEventHandler,
  useCapture?: boolean
): () => void;

declare function once(
  target: EventTarget,
  eventType: AnimationEventTypes,
  handler: AnimationEventHandler,
  useCapture?: boolean
): () => void;

declare function once(
  target: EventTarget,
  eventType: EventType,
  handler: CustomEventHandler,
  useCapture?: boolean
): () => void;

declare function once(
  target: EventTarget,
  eventType: EventType,
  handler: DelegateEventHandler,
  useCapture?: boolean
): () => void;

declare function once(
  target: EventTarget,
  eventType: EventType,
  handler: EventHandler,
  useCapture?: boolean
): () => void;

function once(target, eventType, handler, useCapture = false) {
  function wrappedHandler(event) {
    target.removeEventListener(eventType, wrappedHandler, useCapture);

    handler(event);
  }

  return on(target, eventType, wrappedHandler, useCapture);
}

export default once;
