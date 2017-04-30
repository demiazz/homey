type CSSClass = string;
type Elements = Elements;
type EventType = string;
type EventTypes = string;
type PredicateFn = (element: Element) => boolean;
type Selector = string;

/*
 * Aliases
 */

export const html: Element;
export const body: Element;

/*
 * Queries
 */

export function query(element: Element, selector: Selector): Element | null;
export function queryAll(element: Element, selector: Selector): Elements;
export function matches(element: Element, selector: Selector): boolean;

/*
 * Classes
 */

export function hasClass(element: Element, cssClass: CSSClass): boolean;
export function addClass(element: Element, cssClass: CSSClass): boolean;
export function removeClass(element: Element, cssClass: CSSClass): boolean;
export function toggleClass(element: Element, cssClass: CSSClass, state?: boolean): boolean;

/*
 * Dataset
 */

export function dataset(element: HTMLElement): { [key: string]: string };

/*
 * Traverse
 */

export function parent(element: Element): Element | null;
export function parentBy(element: Element, selector: Selector | PredicateFn): Element | null;
export function parents(element: Element): Elements;
export function parentsBy(element: Element, selector: Selector | PredicateFn): Elements;

/*
 * Manipulate
 */

export function remove(element: Element): boolean;

/*
 * Events
 */

export function on(Element: Element, eventTypes: EventTypes, listener: Function): () => void;
export function once(Element: Element, eventTypes: EventTypes, listener: Function): () => void;
export function off(Element: Element, eventType: EventType, listener: Function): void;