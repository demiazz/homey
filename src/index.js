/* @flow */

import body from "./aliases/body";
import html from "./aliases/html";
import addClass from "./css/add-class";
import hasClass from "./css/has-class";
import removeClass from "./css/remove-class";
import toggleClass from "./css/toggle-class";
import dataset from "./data/dataset";
import delegate from "./events/delegate";
import dispatch from "./events/dispatch";
import on from "./events/on";
import once from "./events/once";
import remove from "./manipulation/remove";
import query from "./queries/query";
import queryAll from "./queries/query-all";
import closest from "./traversing/closest";
import matches from "./traversing/matches";
import parent from "./traversing/parent";
import parentBy from "./traversing/parent-by";
import parents from "./traversing/parents";
import parentsBy from "./traversing/parents-by";

export {
  /* aliases */
  body,
  html,
  /* css */
  addClass,
  hasClass,
  removeClass,
  toggleClass,
  /* data */
  dataset,
  /* events */
  delegate,
  dispatch,
  on,
  once,
  /* manipulate */
  remove,
  /* queries */
  query,
  queryAll,
  /* traversing */
  closest,
  matches,
  parent,
  parentBy,
  parents,
  parentsBy
};
