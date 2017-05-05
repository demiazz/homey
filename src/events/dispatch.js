/* @flow */

import type { EventType } from "./types";

import { getProperty } from "../utils";

type EventOptions = {
  bubbles?: boolean,
  cancelable?: boolean,
  detail?: any
};

function createWithConstructor(
  eventType: EventType,
  bubbles: boolean,
  cancelable: boolean,
  detail: any
): CustomEvent {
  return new CustomEvent(eventType, { bubbles, cancelable, detail });
}

function createWithInit(
  eventType: EventType,
  bubbles: boolean,
  cancelable: boolean,
  detail: any
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
  options?: EventOptions = { bubbles: true, cancelable: true, detail: null }
): boolean {
  const bubbles = getProperty(options, "bubbles", true);
  const cancelable = getProperty(options, "cancelable", true);
  const detail = getProperty(options, "detail", null);
  const event = create(eventType, bubbles, cancelable, detail);

  return target.dispatchEvent(event);
}

export default dispatch;
