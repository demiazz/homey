type Elements = Elements;
type PredicateFn = (element: Element) => boolean;

/*
 * Queries
 */

export function query(element: Element, selector: string): Element | null;
export function queryAll(element: Element, selector: string): Elements;
export function matches(selector: string, element: Element): boolean;

/*
 * Classes
 */

export function hasClass(cssClass: string, element: Element): boolean;
export function addClass(cssClass: string, element: Element): boolean;
export function removeClass(cssClass: string, element: Element): boolean;
export function toggleClass(cssClass: string, element: Element): boolean;

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