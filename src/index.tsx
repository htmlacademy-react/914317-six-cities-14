import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import { OfferRent } from '../src/const';
import { fullOffers,listOffers,offersInNeibourghood } from '../src/mocks/offers';
import { comments } from '../src/mocks/offers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      cardsCount = {OfferRent.Count}
      fullOffers = {fullOffers}
      listOffers = {listOffers}
      comments = {comments}
      offersInNeibourghood = {offersInNeibourghood}
    />
  </React.StrictMode>
);
