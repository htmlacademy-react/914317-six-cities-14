import { createReducer } from '@reduxjs/toolkit';
import { loadOffers, changeCity, changeSort, setDataLoadingStatus, checkAuthorizationStatus, loadOfferData, loadOfferComments, loadOfferNeibourghood, loadFavouriteOffers, loadUserEmail, changeFullOffer, changeOffers, setFormSendingStatus } from './action';
import { Comments, FullOffer, ListOffers, OffersInNeibourghood } from '../types/offer';
import { City } from '../types/offer';
import { findCity, sortOffers } from '../utils/utils';
import { AuthState } from '../const';
import { addCurrentOffer } from '../components/offer/offer-utils';

type InitialState = {
  currentSort: number;
  userEmail: string;
  offers: ListOffers;
  favouriteOffers: ListOffers;
  city: City;
  filtredOffers: ListOffers;
  isDataLoading: boolean;
  isFormSending: boolean;
  isFormSendingSuccessful: boolean;
  authorizationStatus: AuthState;
  currentOffer: FullOffer;
  currentOfferComments: Comments;
  offersNeibourghood: OffersInNeibourghood;
};

const initialState: InitialState = {
  currentSort: 1,
  userEmail: '',
  offers: [],
  favouriteOffers: [],
  city: {
    name: '',
    location: {
      latitude: 0,
      longitude: 0,
      zoom: 0,
    },
  },
  filtredOffers: [],
  isDataLoading: false,
  isFormSending: false,
  isFormSendingSuccessful: false,
  authorizationStatus: AuthState.Unknown,
  currentOffer: {
    id: '',
    title: '',
    type: '',
    price: 0,
    city: {
      name: '',
      location: {
        latitude: 0,
        longitude: 0,
        zoom: 0,
      },
    },
    location: {
      latitude: 0,
      longitude: 0,
      zoom: 0,
    },
    isFavorite: false,
    isPremium: false,
    rating: 0,
    description: '',
    bedrooms: 0,
    goods: [''],
    host: {
      name: '',
      avatarUrl: '',
      isPro: false,
    },
    images: [''],
    maxAdults: 0,
  },
  currentOfferComments: [],
  offersNeibourghood: []
};

export const reducer = createReducer(initialState,
  (builder) => {
    builder
      .addCase(setDataLoadingStatus, (state, action) => {
        state.isDataLoading = action.payload;
      })
      .addCase(changeCity, (state, action) => {
        state.city = findCity(action.payload);
      })
      .addCase(loadOffers, (state, action) => {
        state.offers = action.payload;
        state.filtredOffers = action.payload;
      })
      .addCase(changeSort, (state, action) => {
        state.filtredOffers = sortOffers(action.payload, state.offers);
        state.currentSort = action.payload;
      })
      .addCase(loadOfferData, (state, action) => {
        state.currentOffer = action.payload;
      })
      .addCase(loadUserEmail, (state, action) => {
        state.userEmail = action.payload;
      })
      .addCase(loadFavouriteOffers, (state, action) => {
        state.favouriteOffers = action.payload;
      })
      .addCase(changeFullOffer, (state, action) => {
        state.currentOffer = action.payload;
      })
      .addCase(changeOffers, (state, action) => {
        state.filtredOffers = action.payload;
        state.offers = action.payload;
      })
      .addCase(loadOfferNeibourghood, (state, action) => {
        state.offersNeibourghood = addCurrentOffer(action.payload,state.offers,state.currentOffer.id);
      })
      .addCase(loadOfferComments, (state, action) => {
        state.currentOfferComments = action.payload;
      })
      .addCase(setFormSendingStatus, (state, action) => {
        state.isFormSending = action.payload;
      })
      .addCase(checkAuthorizationStatus, (state, action) => {
        state.authorizationStatus = action.payload;
      });
  });

