/* @flow */

export type CSSClass = string;

export type Dataset = { [key: string]: string };

export type Elements = Array<Element>;

export type EventListener = (event: Event) => mixed;

export type EventOptions = {
  bubbles?: boolean,
  cancelable?: boolean,
  detail?: any
};

export type EventType = string;

export type Predicate = (element: Element) => boolean;

export type Selector = string;
