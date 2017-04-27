/* @flow */

function toggleClass(cssClass: string, element: Element): boolean {
  const contains = element.classList.contains(cssClass);

  if (contains) {
    element.classList.remove(cssClass);
  } else {
    element.classList.add(cssClass);
  }

  return !contains;
}

export default toggleClass;
