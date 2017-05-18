/* @flow */

import type { EventType } from "./types";

import { getProperty } from "../utils";

type EventOptions = {
  bubbles?: boolean,
  cancelable?: boolean
};

function createWithConstructor(
  eventType: EventType,
  detail: any,
  bubbles: boolean,
  cancelable: boolean
): CustomEvent {
  return new CustomEvent(eventType, { bubbles, cancelable, detail });
}

function createWithInit(
  eventType: EventType,
  detail: any,
  bubbles: boolean,
  cancelable: boolean
): CustomEvent {
  const event = document.createEvent("CustomEvent");

  event.initCustomEvent(eventType, bubbles, cancelable, detail);

  return event;
}

const create = typeof window.CustomEvent === "function"
  ? createWithConstructor
  : createWithInit;

function dispatch(
  target: EventTarget,
  eventType: EventType,
  detail: any = {},
  options?: EventOptions = { bubbles: true, cancelable: true }
): boolean {
  const bubbles = getProperty(options, "bubbles", true);
  const cancelable = getProperty(options, "cancelable", true);
  const event = create(eventType, detail, bubbles, cancelable);

  return target.dispatchEvent(event);
}

export default dispatch;
