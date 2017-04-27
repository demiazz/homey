/* @flow */

import hasClass from "./hasClass";

function removeClass(cssClass: string, element: Element): boolean {
  const result = hasClass(cssClass, element);

  if (result) {
    element.classList.remove(cssClass);
  }

  return result;
}

export default removeClass;
