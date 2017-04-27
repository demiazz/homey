/* @flow */

function addClass(cssClass: string, element: Element): boolean {
  if (element.classList.contains(cssClass)) {
    return false;
  }

  element.classList.add(cssClass);

  return true;
}

export default addClass;
