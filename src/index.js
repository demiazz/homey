/* @flow */

import type {
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
} from "./types";

import addClass from "./fn/add-class";
import addClasses from "./fn/add-classes";
import after from "./fn/after";
import append from "./fn/append";
import before from "./fn/before";
import body from "./fn/body";
import closest from "./fn/closest";
import dataset from "./fn/dataset";
import delegate from "./fn/delegate";
import dispatch from "./fn/dispatch";
import getAttr from "./fn/get-attr";
import getHtml from "./fn/get-html";
import getText from "./fn/get-text";
import hasAttr from "./fn/has-attr";
import hasClass from "./fn/has-class";
import html from "./fn/html";
import matches from "./fn/matches";
import on from "./fn/on";
import once from "./fn/once";
import parent from "./fn/parent";
import parentBy from "./fn/parent-by";
import parents from "./fn/parents";
import parentsBy from "./fn/parents-by";
import prepend from "./fn/prepend";
import query from "./fn/query";
import queryAll from "./fn/query-all";
import remove from "./fn/remove";
import removeAttr from "./fn/remove-attr";
import removeClass from "./fn/remove-class";
import removeClasses from "./fn/remove-classes";
import setAttr from "./fn/set-attr";
import setHtml from "./fn/set-html";
import setText from "./fn/set-text";
import toggleClass from "./fn/toggle-class";
import toggleClasses from "./fn/toggle-classes";

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
  addClass,
  addClasses,
  after,
  append,
  before,
  body,
  closest,
  dataset,
  delegate,
  dispatch,
  getAttr,
  getHtml,
  getText,
  hasAttr,
  hasClass,
  html,
  matches,
  on,
  once,
  parent,
  parentBy,
  parents,
  parentsBy,
  prepend,
  query,
  queryAll,
  remove,
  removeAttr,
  removeClass,
  removeClasses,
  setAttr,
  setHtml,
  setText,
  toggleClass,
  toggleClasses
};
