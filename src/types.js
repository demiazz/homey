/* @flow */

export type CSSClass = string;

export type Elements = Array<Element>;

export type EventDetails = { [key: string]: mixed };

export type EventListener = (event: Event) => mixed;

export type EventType = string;

export type Predicate = (element: Element) => boolean;

export type Selector = string;
