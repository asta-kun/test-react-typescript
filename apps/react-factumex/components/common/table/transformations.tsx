import { toString } from 'lodash';
import { ReactNode } from 'react';

export const defaultTransformation = (value: any): ReactNode => toString(value);
