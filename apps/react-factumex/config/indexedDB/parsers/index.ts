import { isISODate } from '../../../utils/iso-date-regex';
import { DateTime } from 'luxon';
import luxonParser from './luxon';

// this should manage only objects, don't include strings or numbers.
export const objectDumpParser = (value: unknown): unknown => {
  // luxon datetime
  if (value instanceof DateTime) return luxonParser.dump(value);

  // return the same as default
  return value;
};

// this should manage only objects, don't include strings or numbers.
export const objectLoadParser = (value: unknown): unknown => {
  // luxon datetime
  if (typeof value === 'string' && isISODate(value)) {
    return luxonParser.load(value);
  }

  // return the same as default
  return value;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parserDumpDeeply = (input: any): any => {
  if (input === null) return input;

  // standard values
  if (
    ['number', 'undefined', 'boolean', 'bigint', 'string'].includes(
      typeof input
    )
  )
    return input;

  // custom objects
  if (input instanceof DateTime) return objectDumpParser(input);

  // array support
  if (Array.isArray(input)) {
    const nextArray = input.map(parserDumpDeeply);
    return nextArray;
  }

  // object support
  if (typeof input === 'object' && input !== null) {
    const nextObject = Object.entries(input).reduce((acc, [key, value]) => {
      // try to preserve the old value if it exists
      const itemResult = parserDumpDeeply(value);

      acc[key] = itemResult;
      return acc;
    }, {} as Record<string, unknown>);

    return nextObject;
  }

  throw new Error(
    `Unsupported input: (${typeof input}) ${JSON.stringify(input)}`
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parserLoadDeeply = (input: any): any => {
  if (input === null) return input;
  if (typeof input === 'string') return objectLoadParser(input);

  // standard values
  if (['number', 'undefined', 'boolean', 'bigint'].includes(typeof input))
    return input;

  // array support
  if (Array.isArray(input)) {
    const nextArray = input.map(parserDumpDeeply);
    return nextArray;
  }

  // object support
  if (typeof input === 'object' && input !== null) {
    const nextObject = Object.entries(input).reduce((acc, [key, value]) => {
      // try to preserve the old value if it exists
      const itemResult = parserLoadDeeply(value);

      acc[key] = itemResult;
      return acc;
    }, {} as Record<string, unknown>);

    return nextObject;
  }

  throw new Error(
    `Unsupported input: (${typeof input}) ${JSON.stringify(input)}`
  );
};
