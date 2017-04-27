type Elements = Elements;
type PredicateFn = (element: Element) => boolean;

/*
 * Queries
 */

export function query(element: Element, selector: string): Element | null;
export function queryAll(element: Element, selector: string): Elements;
export function matches(element: Element, selector: string): boolean;

/*
 * Classes
 */

export function hasClass(element: Element, cssClass: string): boolean;
export function addClass(element: Element, cssClass: string): boolean;
export function removeClass(element: Element, cssClass: string): boolean;
export function toggleClass(element: Element, cssClass: string): boolean;

/*
 * Dataset
 */

export function dataset(element: HTMLElement): { [key: string]: string };

/*
 * Traverse
 */

export function parent(element: Element): Element | null;
export function parentBy(selector: string | PredicateFn, element: Element): Element | null;
export function parents(element: Element): Elements;
export function parentsBy(selector: string | PredicateFn, element: Element): Elements;

/*
 * Manipulate
 */

export function remove(element: Element): boolean;