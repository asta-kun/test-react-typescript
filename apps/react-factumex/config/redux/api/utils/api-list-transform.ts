import { cloneDeep, toString } from 'lodash';

export interface IIndexedAPIEntity<BaseType, IPrimaryKey> {
  byPK: Record<string, BaseType>;
  PKs: IPrimaryKey[];
  raw: BaseType[];
}

export interface IIndexedAPITransformation<State, APIItem> {
  initialValue: State;
  transform: (
    state: State,
    item: APIItem,
    index: number,
    array: APIItem[]
  ) => void;
}

export const defaultAPIListData: IIndexedAPIEntity<unknown, unknown> = {
  byPK: {},
  PKs: [],
  raw: [],
};

interface PrettyAPIListOptions {
  key: string;
}

export const prettyAPIList = <BaseType, IPrimaryKey>(
  raw: BaseType[],
  options: PrettyAPIListOptions
): IIndexedAPIEntity<BaseType, IPrimaryKey> => {
  const { key } = options;

  const state = cloneDeep(defaultAPIListData);
  state.raw = raw;

  raw.forEach((item) => {
    const pk = (item as Record<string, unknown>)[key] as IPrimaryKey;
    state.byPK[toString(pk)] = item;
    state.PKs.push(pk);
  });

  return state as IIndexedAPIEntity<BaseType, IPrimaryKey>;
};
