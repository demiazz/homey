/* @flow */
/* eslint no-redeclare: "off", import/no-mutable-exports: "off" */

import type {
  CustomEventHandler,
  DelegateEventHandler,
  EventType
} from "./types";

declare function on(
  target: EventTarget,
  eventType: MouseEventTypes,
  handler: MouseEventHandler,
  useCapture?: boolean
): () => void;

declare function on(
  target: EventTarget,
  eventType: FocusEventTypes,
  handler: FocusEventHandler,
  useCapture?: boolean
): () => void;

declare function on(
  target: EventTarget,
  eventType: KeyboardEventTypes,
  handler: KeyboardEventHandler,
  useCapture?: boolean
): () => void;

declare function on(
  target: EventTarget,
  eventType: TouchEventTypes,
  handler: TouchEventHandler,
  useCapture?: boolean
): () => void;

declare function on(
  target: EventTarget,
  eventType: WheelEventTypes,
  handler: WheelEventHandler,
  useCapture?: boolean
): () => void;

declare function on(
  target: EventTarget,
  eventType: ProgressEventTypes,
  ler: ProgressEventHandler,
  useCapture?: boolean
): () => void;

declare function on(
  target: EventTarget,
  eventType: DragEventTypes,
  handler: DragEventHandler,
  useCapture?: boolean
): () => void;

declare function on(
  target: EventTarget,
  eventType: AnimationEventTypes,
  handler: AnimationEventHandler,
  useCapture?: boolean
): () => void;

declare function on(
  target: EventTarget,
  eventType: EventType,
  handler: CustomEventHandler,
  useCapture?: boolean
): () => void;

declare function on(
  target: EventTarget,
  eventType: EventType,
  handler: DelegateEventHandler,
  useCapture?: boolean
): () => void;

declare function on(
  target: EventTarget,
  eventType: EventType,
  handler: EventHandler,
  useCapture?: boolean
): () => void;

function on(target, eventType, handler, useCapture = false) {
  target.addEventListener(eventType, (handler: any), useCapture);

  return () =>
    target.removeEventListener(eventType, (handler: any), useCapture);
}

export default on;
