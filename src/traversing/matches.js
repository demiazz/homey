/* @flow */

import type { Selector } from "../types";

type Matches = (selector: Selector) => boolean;

function getMatchesFn(): Matches {
  const element = (document.createElement("div"): any);

  return (
    element.matches ||
    element.matchesSelector ||
    element.msMatchesSelector ||
    element.mozMatchesSelector ||
    element.webkitMatchesSelector ||
    element.oMatchesSelector
  );
}

const matchesFn: Matches = getMatchesFn();

function matches(element: Element, selector: Selector): boolean {
  return matchesFn.call(element, selector);
}

export default matches;
