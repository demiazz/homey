/* Types */

type CSSClass = string;
type CSSSelector = string;
type Dataset = { [key: string]: string };
type Elements = Element[];
type EventType = string;
type EventOptions = { bubbles?: boolean, cancelable?: boolean, detail?: any };
type Predicate = (element: Element) => boolean;

/* Aliases */

export const body: Element;
export const html: Element;

/* CSS */

export function addClass(element: Element, cssClass: CSSClass): boolean;
export function hasClass(element: Element, cssClass: CSSClass): boolean;
export function removeClass(element: Element, cssClass: CSSClass): boolean;
export function toggleClass(element: Element, cssClass: CSSClass, state?: boolean): boolean;

/* Data */

export function dataset(element: HTMLElement): Dataset;

/* Events */

export function dispatch(target: EventTarget, eventType: EventType, options?: EventOptions): boolean;
export function on(element: Element, eventType: EventType, listener: EventListener, useCapture?: boolean): () => void;
export function once(element: Element, eventType: EventType, listener: EventListener, useCapture?: boolean): () => void;
export function delegate(element: Element, selector: CSSSelector, eventType: EventType, listener: EventListener, useCapture?: boolean): () => void;

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
