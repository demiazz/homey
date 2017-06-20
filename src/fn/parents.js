/* @flow */

import type { Elements } from "../types";

import parent from "./parent";

function parents(element: Element): Elements {
  const result = [];

  let current = parent(element);

  while (current) {
    result.push(current);

    current = parent(current);
  }

  return result;
}

export default parents;
