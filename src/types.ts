// Copyright (c) 2017-2020 AppJudo Inc.  MIT License.

import { List } from './ObservableList';

export { default as ObservableList, List, PaginatedObservableList } from './ObservableList';

export type Awaitable<T> = Promise<T> | T;

export type Id = string;
export type StaticUrl = string;
export type DynamicUrl<T extends ModelObject> = (value: Id | T) => string | undefined;
export type Url<T> = StaticUrl | DynamicUrl<T>;

export type ItemResponseMapper<T> = (data: any, context: any) => T | undefined;
export type ListResponseMapper<T> = (data: any, context: any) => List<T>;
export type ListDeleteAllResponseMapper<T> = (data: any, context: any) => List<T> | boolean;

export type Filters = Record<string, any>;
export type Params = Record<string, string | number | boolean>;

export interface CollectionOptions {
  /** Name of sort type to apply. */
  sort?: string;
  /** Filter names/values to apply. */
  filters?: Filters;
  /** True if the sort should be reversed. */
  reverse?: boolean;
  /** Search keywords query string. */
  search?: string;
  /** Number of records per page, or `0` for no pagination. */
  pageSize?: number;
}

export interface LocalStorage {
  getItem: (name: string) => Awaitable<string | null>;
  setItem: (name: string, value: string) => Awaitable<void>;
  removeItem: (name: string) => void;
  clear: () => void;
}

export interface ModelObject {
  id?: Id;
}

export type Constructor<T> = new (...args: any[]) => T;

export type InstantiableParameter<T> = T | ConstructorParameters<Constructor<T>>[0];

export function instantiate<T>(Class: Constructor<T>, params: InstantiableParameter<T>): T {
  return (params instanceof Class) ? params : new Class(params);
}
