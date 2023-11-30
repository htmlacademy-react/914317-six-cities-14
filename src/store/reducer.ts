import { createReducer } from '@reduxjs/toolkit';
import { loadOffers, changeCity, changeSort, setDataLoadingStatus, checkAuthorizationStatus } from './action';
import { ListOffers } from '../types/offer';
import { City } from '../types/offer';
import { filterOffersByCity, sortOffers } from '../utils/utils';
import { AuthState } from '../const';

type InitialState = {
  offers: ListOffers;
  city: City;
  filtredOffers: ListOffers;
  startStateFiltredOffers: ListOffers;
  sortId: number;
  isDataLoading: boolean;
  authorizationStatus: AuthState;
};

const initialState: InitialState = {
  offers: [],
  city: '',
  filtredOffers: [],
  startStateFiltredOffers: [],
  sortId: 1,
  isDataLoading: false,
  authorizationStatus: AuthState.Unknown
};

export const reducer = createReducer(initialState,
  (builder) => {
    builder
      .addCase(setDataLoadingStatus, (state, action) => {
        state.isDataLoading = action.payload;
      })
      .addCase(changeCity, (state, action) => {
        state.city = action.payload;
        state.filtredOffers = filterOffersByCity(action.payload, state.offers);
        state.startStateFiltredOffers = state.filtredOffers;
      })
      .addCase(loadOffers, (state, action) => {
        state.offers = action.payload;
      })
      .addCase(changeSort, (state, action) => {
        state.filtredOffers = sortOffers(action.payload, state.filtredOffers, state.startStateFiltredOffers);
      })
      .addCase(checkAuthorizationStatus, (state, action) => {
        state.authorizationStatus = action.payload;
      });
  });

