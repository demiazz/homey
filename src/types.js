/* @flow */

export type CSSClass = string;
export type CSSClassesMap = { [key: CSSClass]: boolean };
export type CSSSelector = string;
export type CustomEventHandler = (event: CustomEvent) => mixed;
export type Dataset = { [key: string]: string };
export type DelegateEvent = Event & { delegateTarget: EventTarget };
export type DelegateEventHandler = (event: DelegateEvent) => mixed;
export type Elements = Array<Element>;
export type EventType = string;
export type Insertable = string | Node | NodeList<*>;
export type Predicate = (element: Element) => boolean;
