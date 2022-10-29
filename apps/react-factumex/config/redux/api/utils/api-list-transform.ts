import { IAPIStandardListResponse } from '../../../../types/API';
import { cloneDeep, toString } from 'lodash';

export interface IIndexedAPIEntity<
  BaseType,
  IPrimaryKey,
  TransformationResults
> {
  byPK: Record<string, BaseType>;
  PKs: IPrimaryKey[];
  pagination: {
    page: number;
    pages: number;
    pageSize: number;
  };
  raw: IAPIStandardListResponse<BaseType>;
  transformations: TransformationResults;
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

export const defaultAPIListData: IIndexedAPIEntity<
  unknown,
  unknown,
  Record<string, unknown>
> = {
  byPK: {},
  PKs: [],
  transformations: {},
  pagination: {
    page: 0,
    pageSize: 0,
    pages: 0,
  },
  raw: {
    count: 0,
    data: [],
    start: 0,
    total: 0,
  },
};

interface PrettyAPIListOptions<Transformations> {
  key: string;
  transformations?: Transformations;
}

export const prettyAPIList = <
  BaseType,
  IPrimaryKey,
  Transformations,
  TransformationResults
>(
  raw: IAPIStandardListResponse<BaseType>,
  options: PrettyAPIListOptions<Transformations>
): IIndexedAPIEntity<BaseType, IPrimaryKey, TransformationResults> => {
  const { key, transformations = [] } = options;

  const state = cloneDeep(defaultAPIListData);
  state.raw = raw;

  // set initial values for each transformation
  Object.entries(transformations).forEach(([key, transformation]) => {
    const { initialValue } = transformation;
    state.transformations[key] = initialValue;
  });

  raw.data.forEach((item, index, array) => {
    const pk = (item as Record<string, unknown>)[key] as IPrimaryKey;
    state.byPK[toString(pk)] = item;
    state.PKs.push(pk);

    // run transformations
    Object.entries(transformations).forEach(([key, transformation]) => {
      const { transform } = transformation;
      const stateValue = state.transformations[key];
      transform(stateValue, item, index, array);
    });
  });

  return state as IIndexedAPIEntity<
    BaseType,
    IPrimaryKey,
    TransformationResults
  >;
};
