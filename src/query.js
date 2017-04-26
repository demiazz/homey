/* @flow */

function query(selector: string, element?: Element): ?Element {
  const root = element || document;

  return root.querySelector(selector);
}

export default query;
