/* Types */

export type CSSClass = string;
export type CSSSelector = string;
export type Dataset = { [key: string]: string };
export type Elements = Element[];
export type EventType = string;

type EventOptions = { bubbles?: boolean, cancelable?: boolean, detail?: any };
type Predicate = (element: Element) => boolean;

/* Aliases */

export const body: Element;
export const html: Element;

/* CSS */

export function addClass(element: Element, cssClass: CSSClass): boolean;
export function addClass(element: Element, ...cssClasses: CSSClass[]): boolean;
export function hasClass(element: Element, cssClass: CSSClass): boolean;
export function removeClass(element: Element, cssClass: CSSClass): boolean;
export function removeClasses(element: Element, ...cssClasses: CSSClass[]): boolean;
export function toggleClass(element: Element, cssClass: CSSClass, state?: boolean): boolean;

/* Data */

export function dataset(element: HTMLElement): Dataset;

/* Events */

export function dispatch(target: EventTarget, eventType: EventType, detail?: any, options?: EventOptions): boolean;
export function on(target: EventTarget, eventType: EventType, listener: EventListener, useCapture?: boolean): () => void;
export function once(target: EventTarget, eventType: EventType, listener: EventListener, useCapture?: boolean): () => void;
export function delegate(target: EventTarget, selector: CSSSelector, eventType: EventType, listener: EventListener, useCapture?: boolean): () => void;

/* Manipulation */

export function remove(element: Element): boolean;

/* Quering */

export function query(element: Element, selector: CSSSelector): Element | null;
export function queryAll(element: Element, selector: CSSSelector): Elements;

/* Traversing */

export function closest(element: Element, condition: CSSSelector | Predicate): Element | null;
export function matches(element: Element, selector: CSSSelector): boolean;
export function parent(element: Element): Element | null;
export function parentBy(element: Element, condition: CSSSelector | Predicate): Element | null;
export function parents(element: Element): Elements;
export function parentsBy(element: Element, condition: CSSSelector | Predicate): Elements;
