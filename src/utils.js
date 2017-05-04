/* @flow */

function getProperty(
  object: { [key: string]: any },
  property: string,
  defaultValue: any
): any {
  return Object.prototype.hasOwnProperty.call(object, property)
    ? object[property]
    : defaultValue;
}

function toArray(arrayLike: any): Array<any> {
  return Array.prototype.slice.call(arrayLike);
}

export { getProperty, toArray };
