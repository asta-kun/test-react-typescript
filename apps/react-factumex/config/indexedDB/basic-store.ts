import { processHash } from '@factumex/core/config';
import * as IdbKeyval from 'idb-keyval';
import { parserDumpDeeply, parserLoadDeeply } from './parsers';
import indexedDBQueue from './queue';

const databaseName = `basic-store-${processHash}`;
const dataStoreName = 'keyval';

export const getStore = (): IdbKeyval.UseStore => {
  return IdbKeyval.createStore(databaseName, dataStoreName);
};

export const get = async (
  key: string
): Promise<typeof IdbKeyval.get | undefined> => {
  const value = await indexedDBQueue(() => IdbKeyval.get(key, getStore()));
  return parserLoadDeeply(value);
};

export const set = async (key: string, value: unknown): Promise<void> => {
  await indexedDBQueue(() =>
    IdbKeyval.set(key, parserDumpDeeply(value), getStore())
  );
};

export const setMany = async (values: [string, unknown][]): Promise<void> => {
  await indexedDBQueue(() =>
    IdbKeyval.setMany(parserDumpDeeply(values), getStore())
  );
};
