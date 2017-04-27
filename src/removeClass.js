/* @flow */

function removeClass(cssClass: string, element: Element): boolean {
  if (!element.classList.contains(cssClass)) {
    return false;
  }

  element.classList.remove(cssClass);

  return true;
}

export default removeClass;
