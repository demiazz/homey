/* @flow */

export type CSSSelector = string;

export type DelegatedEvent = Event & { delegateTarget: EventTarget };

export type DelegatedEventListener = (event: DelegatedEvent) => mixed;

export type Elements = Array<Element>;

export type EventListener = (event: Event) => mixed;

export type Predicate = (element: Element) => boolean;
