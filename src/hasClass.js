/* @flow */

function hasClass(cssClass: string, element: Element): boolean {
  return element.classList.contains(cssClass);
}

export default hasClass;
