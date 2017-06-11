/* @flow */

import type { CSSClass, CSSClassesMap } from "./css/types";
import type { Dataset } from "./data/types";
import type {
  CustomEventHandler,
  DelegateEvent,
  DelegateEventHandler,
  EventType
} from "./events/types";
import type { Insertable } from "./manipulation/types";
import type { CSSSelector, Elements } from "./types";

import body from "./aliases/body";
import html from "./aliases/html";
import addClass from "./css/add-class";
import addClasses from "./css/add-classes";
import hasClass from "./css/has-class";
import removeClass from "./css/remove-class";
import removeClasses from "./css/remove-classes";
import toggleClass from "./css/toggle-class";
import toggleClasses from "./css/toggle-classes";
import dataset from "./data/dataset";
import delegate from "./events/delegate";
import dispatch from "./events/dispatch";
import on from "./events/on";
import once from "./events/once";
import after from "./manipulation/after";
import append from "./manipulation/append";
import before from "./manipulation/before";
import prepend from "./manipulation/prepend";
import removeAttr from "./manipulation/remove-attr";
import remove from "./manipulation/remove";
import setAttr from "./manipulation/set-attr";
import setHtml from "./manipulation/set-html";
import setText from "./manipulation/set-text";
import query from "./quering/query";
import queryAll from "./quering/query-all";
import closest from "./traversing/closest";
import getAttr from "./traversing/get-attr";
import getHtml from "./traversing/get-html";
import getText from "./traversing/get-text";
import hasAttr from "./traversing/has-attr";
import matches from "./traversing/matches";
import parent from "./traversing/parent";
import parentBy from "./traversing/parent-by";
import parents from "./traversing/parents";
import parentsBy from "./traversing/parents-by";

export type {
  CSSClass,
  CSSClassesMap,
  CSSSelector,
  CustomEventHandler,
  Dataset,
  DelegateEvent,
  DelegateEventHandler,
  Elements,
  EventType,
  Insertable
};

export {
  body,
  html,
  addClass,
  addClasses,
  hasClass,
  removeClass,
  removeClasses,
  toggleClass,
  toggleClasses,
  dataset,
  delegate,
  dispatch,
  on,
  once,
  after,
  append,
  before,
  prepend,
  removeAttr,
  remove,
  setAttr,
  setHtml,
  setText,
  query,
  queryAll,
  closest,
  getAttr,
  getHtml,
  getText,
  hasAttr,
  matches,
  parent,
  parentBy,
  parents,
  parentsBy
};
