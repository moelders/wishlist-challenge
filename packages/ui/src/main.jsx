import React from 'react';
import { render } from 'react-dom';
import { Provider as StoreProvider } from 'react-redux';
import { appendIconDefinitions } from 'yarn-design-system-icons';
import { store } from './store/store';
import { login } from './store/actions';
import { api, Provider as ApiProvider } from './services/api';
import { Provider as TranslationProvider, translations } from './locales/i18n';
import { initI18n } from './services/i18n';
import { get } from './services/storage';
import { Layout } from './layout';
import { STORAGE_KEY } from './config';
import './vendor';
import './styles/styles.scss';

document.addEventListener('DOMContentLoaded', () => {
  const { en, dev } = translations;

  const { t } = initI18n({
    language: {
      lng: 'en',
      messages: en
    },
    fallbackLanguage: {
      lng: 'dev',
      messages: dev
    },
    namespace: 'reactAsyncFlow'
  });

  appendIconDefinitions(document.body);

  const user = get(STORAGE_KEY.user);

  user && store.dispatch(login(user));

  render((
    <ApiProvider value={ api }>
      <StoreProvider store={ store }>
        <TranslationProvider value={ t }>
          <Layout />
        </TranslationProvider>
      </StoreProvider>
    </ApiProvider>
  ), document.getElementById('root'));
});
