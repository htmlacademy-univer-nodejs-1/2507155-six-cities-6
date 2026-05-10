import { ParamsDictionary } from 'express-serve-static-core';

export type LimitRequestParam = {
  limit: string; // TODO есть способ использовать number вместо string?
} | ParamsDictionary;
