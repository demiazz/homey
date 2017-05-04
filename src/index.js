/* @flow */

import { html, body } from "./aliases";
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
  html,
  body,
  /* css */
  hasClass,
  addClass,
  removeClass,
  toggleClass,
  /* data */
  dataset,
  /* events */
  on,
  once,
  delegate,
  dispatch,
  /* manipulate */
  remove,
  /* queries */
  query,
  queryAll,
  matches,
  /* traversing */
  parent,
  parentBy,
  parents,
  parentsBy,
  closest
};
