/* @flow */

function remove(element: Element): boolean {
  const parentElement = element.parentElement;

  if (parentElement) {
    parentElement.removeChild(element);

    return true;
  }

  return false;
}

export default remove;
