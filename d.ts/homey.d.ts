type PredicateFn = (element: Element) => boolean;

export function query(selector: string, element?: Element): Element | null;
export function queryAll(selector: string, element?: Element): Element[];
export function matches(selector: string, element: Element): boolean;
export function parent(element: Element): Element | null;
export function parentBy(selector: string | PredicateFn, element: Element): Element | null;
export function parents(element: Element): Element[];
export function remove(element: Element): boolean;
export function dataset(element: HTMLElement): { [key: string]: string };
