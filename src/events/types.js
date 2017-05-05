/* @flow */

export type CustomEventHandler = (event: CustomEvent) => mixed;

export type DelegateEvent = Event & { delegateTarget: EventTarget };

export type DelegateEventHandler = (event: DelegateEvent) => mixed;

export type EventType = string;
