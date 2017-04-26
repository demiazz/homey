/* @flow */

function parents(element: Element): Array<Element> {
  const result = [];

  let parent = element.parentElement;

  while (parent) {
    result.push(parent);

    parent = parent.parentElement;
  }

  return result;
}

export default parents;
