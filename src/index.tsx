import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import { Provider } from 'react-redux';
import { store } from '../src/store/index';
import { OfferRent } from '../src/const';
import { fullOffers, offersInNeibourghood } from '../src/mocks/offers';
import { comments } from '../src/mocks/offers';
import { fetchListOffersAction } from './store/api-action';

store.dispatch(fetchListOffersAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        cardsCount={OfferRent.Count}
        fullOffers={fullOffers}
        comments={comments}
        offersInNeibourghood={offersInNeibourghood}
      />
    </Provider>
  </React.StrictMode>
);
