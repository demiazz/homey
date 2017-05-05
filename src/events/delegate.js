/* @flow */
/* eslint no-redeclare: "off", import/no-mutable-exports: "off" */

import type { CSSSelector } from "../types";
import type {
  CustomEventHandler,
  DelegateEvent,
  DelegateEventHandler,
  EventType
} from "./types";

import matches from "../traversing/matches";
import parent from "../traversing/parent";

import on from "./on";

declare function delegate(
  element: Element,
  selector: CSSSelector,
  eventType: MouseEventTypes,
  handler: MouseEventHandler,
  useCapture?: boolean
): () => void;

declare function delegate(
  element: Element,
  selector: CSSSelector,
  eventType: FocusEventTypes,
  handler: FocusEventHandler,
  useCapture?: boolean
): () => void;

declare function delegate(
  element: Element,
  selector: CSSSelector,
  eventType: KeyboardEventTypes,
  handler: KeyboardEventHandler,
  useCapture?: boolean
): () => void;

declare function delegate(
  element: Element,
  selector: CSSSelector,
  eventType: TouchEventTypes,
  handler: TouchEventHandler,
  useCapture?: boolean
): () => void;

declare function delegate(
  element: Element,
  selector: CSSSelector,
  eventType: WheelEventTypes,
  handler: WheelEventHandler,
  useCapture?: boolean
): () => void;

declare function delegate(
  element: Element,
  selector: CSSSelector,
  eventType: ProgressEventTypes,
  ler: ProgressEventHandler,
  useCapture?: boolean
): () => void;

declare function delegate(
  element: Element,
  selector: CSSSelector,
  eventType: DragEventTypes,
  handler: DragEventHandler,
  useCapture?: boolean
): () => void;

declare function delegate(
  element: Element,
  selector: CSSSelector,
  eventType: AnimationEventTypes,
  handler: AnimationEventHandler,
  useCapture?: boolean
): () => void;

declare function delegate(
  element: Element,
  selector: CSSSelector,
  eventType: EventType,
  handler: CustomEventHandler,
  useCapture?: boolean
): () => void;

declare function delegate(
  element: Element,
  selector: CSSSelector,
  eventType: EventType,
  handler: DelegateEventHandler,
  useCapture?: boolean
): () => void;

declare function delegate(
  element: Element,
  selector: CSSSelector,
  eventType: EventType,
  handler: EventHandler,
  useCapture?: boolean
): () => void;

function delegate(element, selector, eventType, handler, useCapture = false) {
  function wrappedHandler(event) {
    if (!(event.target instanceof Element)) {
      return;
    }

    let current = event.target;

    while (current) {
      if (matches(current, selector)) {
        ((event: any): DelegateEvent).delegateTarget = element;

        handler(event);

        delete ((event: any): DelegateEvent).delegateTarget;

        return;
      }

      if (current === element) {
        return;
      }

      current = parent(current);
    }
  }

  return on(element, eventType, wrappedHandler, useCapture);
}

export default delegate;
