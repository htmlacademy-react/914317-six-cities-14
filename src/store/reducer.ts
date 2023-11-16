import { createReducer } from '@reduxjs/toolkit';
import { loadOffers, changeCity } from './action';
import { listOffers} from '../mocks/offers';
import { filterOffersByCity } from '../utils/utils';

const initialState = {
  offers: <typeof listOffers>[],
  city: {
    name: '',
  },
  filtredOffers: <typeof listOffers>[]
};

export const reducer = createReducer(initialState,
  (builder) => {
    builder
      .addCase(changeCity, (state, action) => {
        state.city.name = action.payload;
        state.filtredOffers = filterOffersByCity(action.payload,state.offers);
      })
      .addCase(loadOffers, (state) => {
        state.offers = listOffers.slice();
      });
  });

