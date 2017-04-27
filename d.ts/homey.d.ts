type Elements = Elements;
type PredicateFn = (element: Element) => boolean;

export function query(selector: string, element?: Element): Element | null;
export function queryAll(selector: string, element?: Element): Elements;
export function matches(selector: string, element: Element): boolean;
export function parent(element: Element): Element | null;
export function parentBy(selector: string | PredicateFn, element: Element): Element | null;
export function parents(element: Element): Elements;
export function parentsBy(selector: string | PredicateFn, element: Element): Elements;
export function remove(element: Element): boolean;
export function dataset(element: HTMLElement): { [key: string]: string };
export function addClass(cssClass: string, element: Element): boolean;
export function removeClass(cssClass: string, element: Element): boolean;
export function toggleClass(cssClass: string, element: Element): boolean;
export function hasClass(cssClass: string, element: Element): boolean;