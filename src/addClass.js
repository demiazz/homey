/* @flow */

import hasClass from "./hasClass";

function addClass(cssClass: string, element: Element): boolean {
  const result = !hasClass(cssClass, element);

  if (result) {
    element.classList.add(cssClass);
  }

  return result;
}

export default addClass;
