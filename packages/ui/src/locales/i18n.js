import { createContext } from 'react';

export const translations = {
  dev: require('./dev.json'),
  en: require('./en.json')
};

export const I18nContext = createContext();

export const { Provider } = I18nContext;
