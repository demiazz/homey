/* @flow */

function parents(element: Element): Array<Element> {
  const result = [];

  let parentElement = element.parentElement;

  while (parentElement) {
    result.push(parentElement);

    parentElement = parentElement.parentElement;
  }

  return result;
}

export default parents;
