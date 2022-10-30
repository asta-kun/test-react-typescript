import { ReactNode } from 'react';

export interface TableProps<T> {
  items: T[];
  primaryKey: keyof T;
  displayColumns: (keyof T & string)[];
  renderRowField?: Partial<Record<keyof T, (item: any) => ReactNode>>;
  extraFields?: Partial<Record<string, (data: T) => ReactNode>>;
}

export interface TableActions {
  setFilter: (filter: string) => void;
}
