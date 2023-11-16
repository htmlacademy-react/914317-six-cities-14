import { createReducer } from '@reduxjs/toolkit';
import { loadOffers, changeCity, changeSort} from './action';
import { listOffers} from '../mocks/offers';
import { filterOffersByCity, sortOffers } from '../utils/utils';

const initialState = {
  offers: <typeof listOffers>[],
  city: {
    name: '',
  },
  filtredOffers: <typeof listOffers>[],
  startStateFiltredOffers: <typeof listOffers>[],
  sortId: 1,
};

export const reducer = createReducer(initialState,
  (builder) => {
    builder
      .addCase(changeCity, (state, action) => {
        state.city.name = action.payload;
        state.filtredOffers = filterOffersByCity(action.payload,state.offers);
        state.startStateFiltredOffers = state.filtredOffers;
      })
      .addCase(loadOffers, (state) => {
        state.offers = listOffers.slice();
      })
      .addCase(changeSort, (state, action) => {
        state.filtredOffers = sortOffers(action.payload, state.filtredOffers, state.startStateFiltredOffers);
      });
  });

