export enum Locale {
  enUS = 'en-US',
  esMX = 'es-MX',
}

export const defaultLocale: Locale = Locale.enUS;

export interface LocaleSetting {
  locale: Locale;
  name: string;
  language: string;
  settings: {
    dictionary: object;
  };
}

export const localeSettings: Record<Locale, LocaleSetting> = {
  [Locale.enUS]: {
    locale: Locale.enUS,
    name: 'English',
    language: 'en',
    settings: {
      dictionary: {},
    },
  },
  [Locale.esMX]: {
    locale: Locale.esMX,
    name: 'Español',
    language: 'es',
    settings: {
      dictionary: {},
    },
  },
};
