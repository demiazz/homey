/* @flow */

function remove(element: Element): boolean {
  const parent = element.parentElement;

  if (parent) {
    parent.removeChild(element);

    return true;
  }

  return false;
}

export default remove;
