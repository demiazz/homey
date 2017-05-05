/* @flow */

export type EventType = string;

export type CustomEventHandler = (event: CustomEvent) => mixed;

export type DelegateEvent = Event & { delegateTarget: EventTarget };

export type DelegateEventHandler = (event: DelegateEvent) => mixed;
