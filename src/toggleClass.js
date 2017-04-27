/* @flow */

import addClass from "./addClass";
import hasClass from "./hasClass";
import removeClass from "./removeClass";

function toggleClass(cssClass: string, element: Element): boolean {
  const result = !hasClass(cssClass, element);

  if (result) {
    addClass(cssClass, element);
  } else {
    removeClass(cssClass, element);
  }

  return result;
}

export default toggleClass;
