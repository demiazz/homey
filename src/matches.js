/* @flow */

type MatchesFn = (selector: string) => boolean;

type MatchesAPI = { matches: MatchesFn } & { matchesSelector: MatchesFn } & {
    msMatchesSelector: MatchesFn
  } & { mozMatchesSelector: MatchesFn } & {
    webkitMatchesSelector: MatchesFn
  } & { oMatchesSelector: MatchesFn };

function getMatchesFn(): MatchesFn {
  const e = ((document.createElement("div"): any): MatchesAPI);

  return (
    e.matches ||
    e.matchesSelector ||
    e.msMatchesSelector ||
    e.mozMatchesSelector ||
    e.webkitMatchesSelector ||
    e.oMatchesSelector
  );
}

const matchesFn: MatchesFn = getMatchesFn();

function matches(selector: string, element: Element): boolean {
  return matchesFn.call(element, selector);
}

export default matches;
