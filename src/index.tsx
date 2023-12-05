import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/app';
import { Provider } from 'react-redux';
import { store } from '../src/store/index';
import { checkAuthAction, fetchListOffersAction } from './store/api-action';

store.dispatch(fetchListOffersAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>
);
