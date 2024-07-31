import ReactDOM from 'react-dom';import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './index.css';

import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/i18n';
import  Modal from 'react-modal';
import React from 'react';


const queryClient = new QueryClient();

Modal.setAppElement('#root');

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);



